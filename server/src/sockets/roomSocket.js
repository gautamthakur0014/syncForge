const {
  addMember,
  removeMember,
  getRoomMembers,
  getRoomState,
} = require("../managers/roomManager");

const EVENTS = require("../constants/socketEvent");

const roomSocketHandler = (io, socket) => {
  socket.on(EVENTS.JOIN_ROOM, ({ roomId, userName, state }) => {
    
    const result = addMember(
      roomId,
      {
        socketId: socket.id,
        userName,
      },
      state,
    );
    // console.log(result);

    if (!result.success) {
      socket.emit("roomError", {
        message: "Room is full",
        code: "ROOM_FULL",
      });
      return;
    }
    socket.join(roomId);

    socket.data.userName = userName;
    socket.data.roomId = roomId;

    // const members = getRoomMembers(roomId).map((e)=>e.userName);
    const members = getRoomMembers(roomId);
    const roomState = getRoomState(roomId)
    console.log(roomState);

    // send all members to everyone
    // io.to(roomId).emit(EVENTS.ROOM_MEMBERS, members);

    // Send all members only to the newly joined user
    socket.emit(EVENTS.ROOM_MEMBERS, {
      members,
      roomState,
    });

    // Send to everyone in the room except the current user
    socket.to(roomId).emit(EVENTS.USER_JOINED, {
      joinedUser: result.member,
    });
  });

  socket.on("disconnect", () => {
    const removed = removeMember(socket.id);

    if (!removed) return;

    io.to(removed.roomId).emit(EVENTS.ROOM_MEMBERS, removed.members);

    io.to(removed.roomId).emit(EVENTS.USER_LEFT, {
      leavedUserName: socket.data.userName,
    });
  });
};

module.exports = roomSocketHandler;
