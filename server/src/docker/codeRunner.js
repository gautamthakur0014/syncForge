// server/docker/CodeRunner.js

const LanguageConfig = require("./LanguageConfig");
const VolumeManager = require("./VolumeManager");
const DockerManager = require("./DockerManager");

async function runCode({ language, code, input = "" }) {
  const config = LanguageConfig[language];

  if (!config) {
    throw new Error(`Unsupported language: ${language}`);
  }

  let workspace;
  let container;

  try {
    // Create temporary workspace
    workspace = await VolumeManager.createWorkspace();

    // Write source code
    await VolumeManager.writeCode(
      workspace.workspacePath,
      config.filename,
      code,
    );

    // Write stdin input
    await VolumeManager.writeInput(workspace.workspacePath, input);

    // Create docker container
    container = await DockerManager.createContainer({
      image: config.image,
      workspacePath: workspace.workspacePath,
      runCommand: config.runCommand,
    });

    // Start execution
    await DockerManager.startContainer(container);

    // Wait until execution completes
    const result = await DockerManager.waitContainer(container);

    // Read stdout/stderr
    const output = await DockerManager.getLogs(container);

    return {
      success: result.StatusCode === 0,
      statusCode: result.StatusCode,
      output,
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
      await DockerManager.removeContainer(container);
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
