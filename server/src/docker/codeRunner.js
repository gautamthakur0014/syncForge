// server/docker/CodeRunner.js

const LanguageConfig = require("./LanguageConfig");
const VolumeManager = require("./VolumeManager");
const containerManager = require("./containerManager");
const LogCollector = require("./logCollector");

async function runCode({ image, filename, runCommand, code, input = "" }) {
  console.log("IMAGE: ", image);
  console.log("FILENAME: ", filename);
  console.log("CODE : ", code);
  console.log("COMMAND:", runCommand);

  let workspace;
  let container;

  try {
    // Create temporary workspace
    workspace = await VolumeManager.createWorkspace();

    // Write source code
    await VolumeManager.writeCode(workspace.workspacePath, filename, code);

    // Write stdin input
    await VolumeManager.writeInput(workspace.workspacePath, input);

    // Create docker container
    container = await containerManager.createContainer({
      image: image,
      workspacePath: workspace.workspacePath,
      runCommand: runCommand,
    });

    const logPromise = LogCollector.collect(container);

    // Start execution
    await containerManager.startContainer(container);

    // Wait until execution completes
    const result = await containerManager.waitContainer(container);

    console.log(result);

    // Wait for logs to finish streaming
    const logs = await logPromise;

    // Output limit exceeded
    if (logs.killedByOutputLimit) {
      return {
        success: false,
        statusCode: -2,
        output: "",
        error: "Output limit exceeded.",
      };
    }

    if (result.timedOut) {
      return {
        success: false,
        statusCode: -3,
        error: "Time limit exceeded.",
      };
    }

    return {
      success: result.StatusCode === 0,
      statusCode: result.StatusCode,
      output: logs.stdout,
      error: logs.stderr,
    };
  } catch (err) {
    return {
      success: false,
      statusCode: -1,
      output: err.message,
    };
  } finally {
    // Remove container
    if (container) {
      await containerManager.removeContainer(container);
    }

    // Delete temporary workspace
    if (workspace) {
      await VolumeManager.deleteWorkspace(workspace.workspacePath);
      console.log("vol deleted");
    }
  }
}

module.exports = {
  runCode,
};
