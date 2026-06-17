const { getUser } = require("../managers/roomManager")

const cursorSyncHandler = (io, socket) => {
  socket.on("cursorMove", ({ roomId, position }) => {
    const user = getUser(roomId, socket.id);
    console.log("user");
    console.log(user[0]);

    if (!user) return;

    socket.to(roomId).emit("cursorUpdate", {
      // userId: member.userId,
      userName: user[0].userName,
      userColor : user[0].userColor,
      position,
    });
  });
};

module.exports = cursorSyncHandler;
