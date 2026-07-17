const socketIO = require("socket.io");
const roomSocketHandler = require("./roomSocket");
// const codeSyncHandler = require('./codeSync');
const cursorSyncHandler = require("./cursorSync");
const yjsSyncHandler = require("./yjsSyncHandler");
// const outputSync = require("./outputSync");
const inputSyncHandler = require("./inputSync");
const editorSettingSync = require("./editorSettingSync");
const roomLeaveHandler = require("./roomLeave");

const initializeSocket = (server, app) => {
  const io = socketIO(server, {
    cors: {
      origin: process.env.CLIENT_URL,
    },
  });

  app.set("io", io);

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    roomSocketHandler(io, socket);
    // codeSyncHandler(io, socket);
    cursorSyncHandler(io, socket);
    yjsSyncHandler(io, socket);
    inputSyncHandler(io, socket);
    editorSettingSync(io, socket);
    roomLeaveHandler(io, socket);
  });
};

module.exports = initializeSocket;
