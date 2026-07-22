"use strict";

const path = require("path");
const { Writable } = require("stream");
const docker = require("../config/docker.js");
const hostConfig = require("./hostConfig.js");

class containerManager {
  static async createContainer({ image, workspacePath, runCommand }) {
    try {
      console.log("Creating container...");

      const container = await docker.createContainer({
        Image: image,

        Cmd: runCommand,

        WorkingDir: "/app",

        AttachStdout: true,
        AttachStderr: true,
        AttachStdin: false,

        OpenStdin: false,
        StdinOnce: false,

        Tty: false,

        User: "1000:1000",

        HostConfig: {
          ...hostConfig,

          // Mount workspace
          Binds: [
            `${path.resolve(workspacePath)}:/app`,
            // Use :ro if the workspace should be read-only
            // `${path.resolve(workspacePath)}:/app:ro`,
          ],
        },
      });

      console.log(`Container created: ${container.id}`);

      return container;
    } catch (error) {
      console.error("Failed to create container:", error);
      throw error;
    }
  }

  static async startContainer(container) {
    await container.start();
    console.log("Started");
  }

  static async waitContainer(container, timeoutMs = 5000) {
    let timedOut = false;

    const timeout = setTimeout(async () => {
        timedOut = true;
      try {
        console.warn(`Container timed out after ${timeoutMs}ms`);
        await container.kill();
      } catch (err) {
        // Ignore "already stopped" or "not found" errors
        if (err.statusCode !== 404 && err.statusCode !== 409) {
          console.error("Failed to kill container:", err);
        }
      }
    }, timeoutMs);

    try {
      const result = await container.wait();

      return {
        ...result,
        timedOut,
      };
    } finally {
      clearTimeout(timeout);
    }
  }

  // static async getLogs(container) {
  //   const stream = await container.logs({
  //     stdout: true,
  //     stderr: true,
  //     follow: false,
  //   });

  //   let offset = 0;
  //   let stdout = "";
  //   let stderr = "";

  //    while (offset < stream.length) {
  //      const streamType = stream[offset];

  //      // Docker header = 8 bytes
  //      const size = stream.readUInt32BE(offset + 4);

  //      const start = offset + 8;
  //      const end = start + size;

  //      const data = stream.subarray(start, end).toString("utf8");

  //      if (streamType === 1) {
  //        stdout += data;
  //      } else if (streamType === 2) {
  //        stderr += data;
  //      }

  //      offset = end;
  //    }
  //   return {
  //     stdout,
  //     stderr,
  //   };
  // }

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

module.exports = containerManager;
