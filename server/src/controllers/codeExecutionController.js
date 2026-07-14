"use strict";

const { runCode } = require("../docker/CodeRunner");
const ExecutionService = require("../execution/ExecutionService");
const executionQueue = require("../execution/ExecutionQueue");

exports.executeCode = async (req, res) => {
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
