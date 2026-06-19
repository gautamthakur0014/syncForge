const yjsSyncHandler = (io, socket) => {
  socket.on("yjs-update", ({ roomId, update }) => {
    socket.to(roomId).emit("yjs-update", {
      update,
    });
  });
};

module.exports = yjsSyncHandler;
