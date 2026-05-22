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

    socket.on("joinRoom", ({roomId, userName})=>{
      socket.join(roomId);
      console.log("room joined: ", roomId,  userName);
      
      socket.to(roomId).emit("roomJoined", {member:userName});
    });


    socket.on("disconnect", ()=>{
      console.log("socket dissconnected");
    });
});
};


module.exports = initializeSocket;