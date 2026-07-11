const Docker = require("dockerode");
const path = require("path");

const docker = new Docker();

class DockerManager {
  static async ensureImage(image) {
    try {
      // Check if image already exists locally
      await docker.getImage(image).inspect();
      console.log(`Image '${image}' already exists.`);
    } catch {
      console.log(`Image '${image}' not found. Pulling...`);

      await new Promise((resolve, reject) => {
        docker.pull(image, (err, stream) => {
          if (err) return reject(err);

          docker.modem.followProgress(stream, (err) => {
            if (err) return reject(err);

            console.log(`Image '${image}' pulled successfully.`);
            resolve();
          });
        });
      });
    }
  }

  static async createContainer({ image, workspacePath, runCommand }) {
    try {
      // Ensure the required image exists
      await this.ensureImage(image);

      console.log("Creating container...");

      const container = await docker.createContainer({
        Image: image,
        Cmd: runCommand,
        WorkingDir: "/app",

        AttachStdout: true,
        AttachStderr: true,
        OpenStdin: false,
        Tty: false,

        HostConfig: {
          Binds: [`${path.resolve(workspacePath)}:/app`],

          AutoRemove: false, // Set true after debugging if desired

          NetworkMode: "none",

          Memory: 256 * 1024 * 1024, // 256 MB
          CpuShares: 512,
        },
      });

      console.log("Container created:", container.id);

      return container;
    } catch (err) {
      console.error("Failed to create container:", err);
      throw err;
    }
  }

  static async startContainer(container) {
    await container.start();
    console.log("Started");
  }

  static async waitContainer(container) {
    return await container.wait();
  }

  static async getLogs(container) {
    const logs = await container.logs({
      stdout: true,
      stderr: true,
    });

    return logs.toString("utf8");
  }

  static async stopContainer(container) {
    try {
      await container.stop();
      console.log("Stopped");
    } catch {
      // Ignore if already stopped
    }
  }

  static async removeContainer(container) {
    try {
      await container.remove({
        force: true,
      });
    } catch {
      // Ignore if already removed
    }
  }
}

module.exports = DockerManager;

