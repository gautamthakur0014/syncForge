"use strict";

const { PassThrough } = require("stream");

class LogCollector {
  static async collect(container, maxOutputSize = 1024 * 1024) {
    const attachStream = await container.attach({
      stream: true,
      stdout: true,
      stderr: true,
    });

    const stdoutStream = new PassThrough();
    const stderrStream = new PassThrough();

    // Separate stdout and stderr
    container.modem.demuxStream(attachStream, stdoutStream, stderrStream);

    let stdout = "";
    let stderr = "";

    let totalBytes = 0;
    let killedByOutputLimit = false;

    const checkLimit = async (chunkLength) => {
      totalBytes += chunkLength;

      if (totalBytes > maxOutputSize && !killedByOutputLimit) {
        killedByOutputLimit = true;

        try {
          await container.kill();
        } catch {}
      }
    };

    stdoutStream.on("data", async (chunk) => {
      await checkLimit(chunk.length);

      if (!killedByOutputLimit) {
        stdout += chunk.toString("utf8");
      }
    });

    stderrStream.on("data", async (chunk) => {
      await checkLimit(chunk.length);

      if (!killedByOutputLimit) {
        stderr += chunk.toString("utf8");
      }
    });

    return new Promise((resolve, reject) => {
      let ended = 0;

      const finish = () => {
        ended++;

        if (ended === 2) {
          resolve({
            stdout,
            stderr,
            killedByOutputLimit,
          });
        }
      };

      stdoutStream.on("end", finish);
      stderrStream.on("end", finish);

      stdoutStream.on("error", reject);
      stderrStream.on("error", reject);

      attachStream.on("end", () => {
        stdoutStream.end();
        stderrStream.end();
      });

      attachStream.on("error", reject);
    });
  }
}

module.exports = LogCollector;
