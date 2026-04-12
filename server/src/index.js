"use strict";

const express = require("express");
const http = require("http");
const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const morgan = require('morgan')
const initializeSocket = require("./utils/socket");
const logger = require("./config/logger");
const errorHandler = require("./middleware/errorHandler");
const {connectMongo, disconnectMongo} = require("./config/database")

require("dotenv").config();

const app = express();

// SECURITY middleware

app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        connectSrc: ["'self'", process.env.CLIENT_URL],
        imgSrc: ["'self'", "data:", "blob:"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
      },
    },
  }),
);

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  }),
);

// GENERAL middleware

app.use(compression());
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(
  morgan("combined", { stream: { write: (msg) => logger.http(msg.trim()) } }),
);

const server = http.createServer(app);
initializeSocket(server);

// ─── 404 Handler ─────────────────────────────────────────────────────────────
app.use((req, res) => {
  res
    .status(404)
    .json({ success: false, message: `Route ${req.originalUrl} not found` });
});

// ─── Global Error Handler ─────────────────────────────────────────────────────
app.use(errorHandler);

// Bootstrap

const PORT = process.env.PORT || 5000;

async function bootstrap() {
  try {
    await connectMongo();

    server.listen(PORT, () => {
      logger.info(
        `syncForge API running on port ${PORT} [${process.env.NODE_ENV}]`,
      );
    });
  } catch (err) {
    logger.error("Failed to start server:", err);
    process.exit(1);
  }
}

// Graceful shutdown
process.on("SIGTERM", async () => {
  logger.info("SIGTERM received, shutting down gracefully");
  server.close(() => {
    logger.info("HTTP server closed");
    process.exit(0);
  });
});

bootstrap();

module.exports = app;
