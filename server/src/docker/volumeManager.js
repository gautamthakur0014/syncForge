const fs = require("fs/promises");
const path = require("path");
const os = require("os");
const { randomUUID } = require("crypto");

// Creates: C:\Users\<user>\AppData\Local\Temp\syncforge (Windows)
// or: /tmp/syncforge (Linux/macOS)
const TEMP_DIR = path.join(os.tmpdir(), "syncforge");

class VolumeManager {
  static async createWorkspace() {
    const workspaceId = randomUUID();
    const workspacePath = path.join(TEMP_DIR, workspaceId);

    await fs.mkdir(workspacePath, {
      recursive: true,
    });

    return {
      workspaceId,
      workspacePath,
    };
  }

  static async writeCode(workspacePath, filename, code) {
    const filePath = path.join(workspacePath, filename);

    await fs.writeFile(filePath, code, "utf8");

    return filePath;
  }

  static async writeInput(workspacePath, input = "") {
    const inputPath = path.join(workspacePath, "input.txt");

    await fs.writeFile(inputPath, input, "utf8");

    return inputPath;
  }

  static async deleteWorkspace(workspacePath) {
    await fs.rm(workspacePath, {
      recursive: true,
      force: true,
    });
  }
}

module.exports = VolumeManager;
