const socketIO = require('socket.io');
const roomSocketHandler = require("./roomSocket");
const codeSyncHandler = require('./codeSync');


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
});
};


module.exports = initializeSocket;