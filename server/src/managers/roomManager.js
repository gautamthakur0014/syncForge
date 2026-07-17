const Y = require("yjs");
const getUserColor = require("../utils/getUserColor");

const rooms = new Map();
const MAX_ROOM_SIZE = 4;

const addMember = (roomId, member, roomState = null) => {
  let role = "member";

  if (!rooms.has(roomId)) {
    rooms.set(roomId, {
      members: [],
      ydoc: new Y.Doc(),
      state: roomState || {
        langauge: "javascript",
        theme: "vs-dark",
      },
    });
    role = "admin";
  }
  const members = rooms.get(roomId).members;
  //  reject if room is full
  if (members.length >= MAX_ROOM_SIZE) {
    return { success: false, reason: "ROOM_FULL" };
  }

  const newMember = {
    ...member,
    userColor: getUserColor(member.userName),
    role,
  };

  const index = members.findIndex((m) => m.socketId === member.socketId);

  if (index !== -1) {
    members[index] = newMember; // update instead of duplicate
  } else {
    members.push(newMember);
  }

  return {
    success: true,
    reason: "JOINED",
    member: newMember,
    // state : roomId.state,
  };
};

const removeMember = (socketId) => {
  for (const [roomId, room] of rooms.entries()) {
    const removedMember = room.members.find(
      (member) => member.socketId === socketId,
    );
    if (!removedMember) continue;

    const filteredMembers = room.members.filter(
      (member) => member.socketId !== socketId,
    );

    if (filteredMembers.length !== room.members.length) {
      room.members = filteredMembers;

      if (filteredMembers.length === 0) {
        rooms.delete(roomId);
      }

      // const filteredMembersNames = filteredMembers.map((e)=>(e.userName))
      return {
        roomId,
        members: filteredMembers,
        removedMember,
      };
    }
  }

  return null;
};

const getRoom = (roomId) => {
  return rooms.get(roomId);
};

const getRoomMembers = (roomId) => {
  return rooms.get(roomId)?.members || [];
};

const getUser = (roomId, socketId) => {
  return rooms.get(roomId).members.filter((e) => e.socketId == socketId);
};

const getRoomState = (roomId) => {
  return rooms.get(roomId)?.state || null;
};
const updateRoomState = (roomId, updatedCode) => {
  rooms.get(roomId).state.code = updatedCode;
};

const getYdocState = (roomId) => {
  const room = rooms.get(roomId);

  if (!room || !room.ydoc) return null;

  return Array.from(Y.encodeStateAsUpdate(room.ydoc));
};

const updateOutput = (roomId, updatedOutput) => {
  rooms.get(roomId).state.output = updatedOutput;
};

const updateInput = (roomId, updatedInput) => {
  rooms.get(roomId).state.input = updatedInput;
}

const updateLanguage = (roomId, language) =>{
  rooms.get(roomId).state.language = language;
}

const updateTheme = (roomId, theme) => {
  rooms.get(roomId).state.theme = theme;
}

module.exports = {
  addMember,
  removeMember,
  getRoomMembers,
  getRoomState,
  updateRoomState,
  getUser,
  getRoom,
  getYdocState,
  updateInput,
  updateOutput,
  updateLanguage,
  updateTheme,
};
