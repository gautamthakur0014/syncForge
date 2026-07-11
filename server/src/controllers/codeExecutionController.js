"use strict";

const { runCode } = require("../docker/CodeRunner");

exports.executeCode = async (req, res) => {
  const { language, code, input = "" } = req.body;
  console.log(language);
  console.log("language");

  if (!language || !code) {
    return res.status(400).json({
      success: false,
      output: null,
      error: "language and code are required",
    });
  }

  try {
    const result = await runCode({
      language,
      code,
      input,
    });

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
