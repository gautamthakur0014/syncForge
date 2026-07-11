"use strict";

const express = require("express");
const router = express.Router();

const catchAsync = require("../utils/catchAsync");
const codeExecutionController = require("../controllers/codeExecutionController");

router.post("/", catchAsync(codeExecutionController.executeCode));

module.exports = router;
