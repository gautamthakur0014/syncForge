const rooms = new Map();
const MAX_ROOM_SIZE = 4;

const addMember = (roomId, member) => {
  if (!rooms.has(roomId)) {
    rooms.set(roomId, []);
  }
  const members = rooms.get(roomId);

  //  reject if room is full
  if (members.length >= MAX_ROOM_SIZE) {
    return { success: false, reason: "ROOM_FULL" };
  }

  const index = members.findIndex((m) => m.socketId === member.socketId);

  if (index !== -1) {
    members[index] = member; // update instead of duplicate
  } else {
    members.push(member);
  }

  return {
    success: true,
    reason: "JOINED",
  };

};

const removeMember = (socketId) => {
  for (const [roomId, members] of rooms.entries()) {
    const filteredMembers = members.filter(
      (member) => member.socketId !== socketId,
    );

    if (filteredMembers.length !== members.length) {
      rooms.set(roomId, filteredMembers);

      if (filteredMembers.length === 0) {
        rooms.delete(roomId);
      }

      return {
        roomId,
        members: filteredMembers,
      };
    }
  }

  return null;
};

const getRoomMembers = (roomId) => {
  return rooms.get(roomId) || [];
};

module.exports = {
  addMember,
  removeMember,
  getRoomMembers,
};
