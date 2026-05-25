const rooms = new Map();

/* format:-
rooms = {
  room123: [
    {
      socketId,
      userName
    }
  ]
}
*/

const addMember = (roomId, member) => {
  if (!rooms.has(roomId)) {
    rooms.set(roomId, []);
  }

  rooms.get(roomId).push(member);
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
