const { removeMember } = require("../managers/roomManager");
const EVENTS = require("../constants/socketEvent");

const roomLeaveHandler = (io, socket) => {
  const handleUserLeave = () => {
    const removed = removeMember(socket.id);

    if (!removed) return;

    socket.leave(removed.roomId);

    io.to(removed.roomId).emit(EVENTS.USER_LEFT, {
      leavedUserName: removed.removedMember.userName,
    });
  };

  socket.on(EVENTS.LEAVE_ROOM, handleUserLeave);

  socket.on("disconnect", handleUserLeave);
};

module.exports = roomLeaveHandler;
