const { getRoom } = require("../managers/roomManager");
const Y = require("yjs");

const yjsSyncHandler = (io, socket) => {
  socket.on("yjs-update", ({ roomId, update }) => {
    const room = getRoom(roomId);
    if (!room) return;

    Y.applyUpdate(room.ydoc, new Uint8Array(update));


    socket.to(roomId).emit("yjs-update", {
      update,
    });
  });
};

module.exports = yjsSyncHandler;
