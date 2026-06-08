const codeSyncHandler = (io, socket) => {
  socket.on("sendCodeChange", ({ roomId, code }) => {
    console.log("code");
    console.log(code);
    
    socket.to(roomId).emit("receiveCodeChange", { code });
  });
};

module.exports = codeSyncHandler;
