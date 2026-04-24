const socketIO = require('socket.io');



const initializeSocket = (server) => {

const io = socketIO(server, {
  cors: {
    origin: process.env.CLIENT_URL,
  },
}); 


io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);


    socket.on("register", ()=>{});


    socket.on("disconnect", ()=>{
      console.log("socket dissconnected");
    });
});
};


module.exports = initializeSocket;