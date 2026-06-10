const { updateRoomState } = require("../managers/roomManager");

const codeSyncHandler = (io, socket) => {
  socket.on("sendCodeChange", ({ roomId, code }) => {
    if(!roomId)return;
    updateRoomState(roomId,code);
    
    socket.to(roomId).emit("receiveCodeChange", { code });
  });
};

module.exports = codeSyncHandler;
