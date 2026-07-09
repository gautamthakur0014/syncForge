const {
  addMember,
  removeMember,
  getRoomMembers,
  getRoomState,
  getYdocState,
  getRoom,
} = require("../managers/roomManager");

const Y = require("yjs");

const EVENTS = require("../constants/socketEvent");


const roomSocketHandler = (io, socket) => {
  socket.on(EVENTS.JOIN_ROOM, ({ roomId, userName, state, ydocStateVector }) => {
    
    const result = addMember(
      roomId,
      {
        socketId: socket.id,
        userName,
      },
      state,
    );

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
    const roomState = getRoomState(roomId);
    const ydocState = getYdocState(roomId);
    const room = getRoom(roomId);

    if (ydocStateVector && room.ydoc) {
      const missingUpdate = Y.encodeStateAsUpdate(
        room.ydoc,
        new Uint8Array(ydocStateVector),
      );
      // (server sends this back — already handled via ydocState in roomMembers)
    }

    // send all members to everyone
    // io.to(roomId).emit(EVENTS.ROOM_MEMBERS, members);

    // Send all members only to the newly joined user
    socket.emit(EVENTS.ROOM_MEMBERS, {
      members,
      roomState,
      ydocState,
    });

    // Send to everyone in the room except the current user
    socket.to(roomId).emit(EVENTS.USER_JOINED, {
      joinedUser: result.member,
    });
  });

  socket.on("disconnect", () => {
    const removed = removeMember(socket.id);

    if (!removed) return;

    // io.to(removed.roomId).emit(EVENTS.ROOM_MEMBERS, removed);

    io.to(removed.roomId).emit(EVENTS.USER_LEFT, {
      leavedUserName: removed.removedMember.userName,
    });
  });
};

module.exports = roomSocketHandler;
