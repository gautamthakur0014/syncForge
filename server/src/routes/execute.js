"use strict";
const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const { error } = require("winston");
const { spawn } = require("child_process");

// execute code
router.post(
  "/",
  catchAsync(async (req, res) => {
    const { language, code } = req.body;
    
    if (language !== "javaScript") {
      return res.status(400).json({ error: "Only JS supported for now" });
    }
    const child = spawn("node", ["-e", code]);

    let output = "";
    let errorOutput = "";

    child.stdout.on("data", (data) => {
      output += data.toString();
    });

    child.stderr.on("data", (data) => {
      errorOutput += data.toString();
    });

    child.on("close", () => {
      if (errorOutput) {
        return res.json({
          success: false,
          output: null,
          error: errorOutput,
        });
      }

      res.json({
        success: true,
        output,
        error: null,
      });
    });
    
    
  }),
);

module.exports = router;