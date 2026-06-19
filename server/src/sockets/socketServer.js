const socketIO = require('socket.io');
const roomSocketHandler = require("./roomSocket");
const codeSyncHandler = require('./codeSync');
const cursorSyncHandler = require('./cursorSync');
const yjsSyncHandler = require('./yjsSyncHandler');


const initializeSocket = (server) => {

const io = socketIO(server, {
  cors: {
    origin: process.env.CLIENT_URL,
  },
}); 


io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);
    
    roomSocketHandler(io,socket);
    codeSyncHandler(io, socket);
    cursorSyncHandler(io,socket);
    yjsSyncHandler(io, socket);
});
};


module.exports = initializeSocket;