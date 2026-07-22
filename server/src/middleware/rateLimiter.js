const rateLimit = require("express-rate-limit");

const executeLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5,  // 5 calls
  message: {
    success: false,
    message: "Too many execution requests",
  },
});


module.exports = {
  executeLimiter,
};