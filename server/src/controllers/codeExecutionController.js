"use strict";

const { runCode } = require("../docker/CodeRunner");
const ExecutionService = require("../execution/ExecutionService");
const executionQueue = require("../execution/ExecutionQueue");
const { updateOutput } = require("../managers/roomManager");
const EVENTS = require("../constants/socketEvent");


exports.executeCode = async (req, res) => {
  const MAX_CODE_SIZE = 10 * 1024; // 10 KB
  const MAX_INPUT_SIZE = 5 * 1024; // 5 KB
  const { roomId, language, code, input = "" } = req.body;
  console.log(language);
  console.log("language");
  console.log("imput");
  console.log(input);

  if (!language || !code) {
    return res.status(400).json({
      success: false,
      output: null,
      error: "language and code are required",
    });
  }

  if (code.length > MAX_CODE_SIZE) {
    return res.status(400).json({
      success: false,
      message: "Code exceeds 100 KB limit.",
    });
  }

  if (input.length > MAX_INPUT_SIZE) {
    return res.status(400).json({
      success: false,
      message: "Input exceeds 20 KB limit.",
    });
  }

  try {
    const result = await executionQueue.add(() =>
      ExecutionService.execute({
        language,
        code,
        input,
      }),
    );

    console.log("result : ");
    console.log(result);

    console.log(roomId, "used");
    if (roomId) {
      const io = req.app.get("io");

      updateOutput(roomId, result);

      io.to(roomId).emit(EVENTS.OUTPUT_UPDATE, result);
      console.log("emmited");
    }

    return res.status(200).json(result);
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      output: null,
      error: "Failed to execute code.",
    });
  }
};
