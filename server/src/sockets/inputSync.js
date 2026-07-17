const { updateInput } = require("../managers/roomManager");

const inputSyncHandler = (io, socket) => {
  socket.on("sendInput", ({ roomId, input }) => {
    console.log("helle");
    console.log(roomId, input);
    if (!roomId) return;

    updateInput(roomId, input);

    socket.to(roomId).emit("receiveInput", { receivedInput: input });
  });
};

module.exports = inputSyncHandler;
