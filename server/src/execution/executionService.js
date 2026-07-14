"use strict";

const codeRunner = require("../docker/codeRunner");
const languageConfig = require("../docker/languageConfig");
const AppError = require("../utils/AppError");

class ExecutionService {
  static async execute({ language, code, input = "" }) {
    this.validateExecution({
      language,
      code,
      input,
    });

    const config = this.getLanguageConfig(language);

    const result = await codeRunner.runCode({
      image: config.image,
      filename: config.filename,
      runCommand: config.runCommand,
      code,
      input,
    });

    return result;
  }

  static validateExecution({ language, code, input }) {
    if (!language) {
      throw new AppError("Language is required", 400);
    }

    if (typeof code !== "string") {
      throw new AppError("Code must be a string", 400);
    }

    if (!code.trim()) {
      throw new AppError("Code cannot be empty", 400);
    }

    if (typeof input !== "string") {
      throw new AppError("Input must be a string", 400);
    }
  }

  static getLanguageConfig(language) {
    const config = languageConfig[language];

    if (!config) {
      throw new AppError(`Unsupported language: ${language}`, 400);
    }

    return config;
  }
}

module.exports = ExecutionService;
