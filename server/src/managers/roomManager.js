const rooms = new Map();
const MAX_ROOM_SIZE = 4;

const addMember = (roomId, member, roomState = null) => {

  let role = "member";

  if (!rooms.has(roomId)) {
    rooms.set(roomId, {
      members: [],
      state: roomState || {
        code: "",
        lang: "javascript",
        theme: "vs-dark",
      },
    });
    role = "admin"
  }
  const members = rooms.get(roomId).members;
  //  reject if room is full
  if (members.length >= MAX_ROOM_SIZE) {
    return { success: false, reason: "ROOM_FULL" };
  }

  const newMember = {
    ...member,
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
    member : newMember,
    // state : roomId.state,
  };

};

const removeMember = (socketId) => {
  for (const [roomId, room] of rooms.entries()) {
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
      };
    }
  }

  return null;
};

const getRoomMembers = (roomId) => {
  return rooms.get(roomId)?.members || [];
};

const getRoomState = (roomId) => {
  return rooms.get(roomId)?.state || null;
};

module.exports = {
  addMember,
  removeMember,
  getRoomMembers,
  getRoomState,
};
