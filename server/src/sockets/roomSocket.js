const {
  addMember,
  removeMember,
  getRoomMembers,
} = require("../managers/roomManager");

const EVENTS = require("../constants/socketEvent");

const roomSocketHandler = (io, socket) => {
  socket.on(EVENTS.JOIN_ROOM, ({ roomId, userName }) => {
    socket.join(roomId);

    socket.data.userName = userName;
    socket.data.roomId = roomId;

    addMember(roomId, {
      socketId: socket.id,
      userName,
    });

    const members = getRoomMembers(roomId);

    // send all members to everyone
    io.to(roomId).emit(EVENTS.ROOM_MEMBERS, members);

    // optional event
    socket.to(roomId).emit(EVENTS.USER_JOINED, {
      userName,
    });
  });

  socket.on("disconnect", () => {
    const removed = removeMember(socket.id);

    if (!removed) return;

    io.to(removed.roomId).emit(EVENTS.ROOM_MEMBERS, removed.members);

    io.to(removed.roomId).emit(EVENTS.USER_LEFT, {
      userName: socket.data.userName,
    });
  });
};

module.exports = roomSocketHandler;
