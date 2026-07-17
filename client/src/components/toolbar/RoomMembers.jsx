import React from "react";
import useRoomStore from "../../store/useRoomStore";

const RoomMembers = () => {
  const users = useRoomStore((s) => s.users);

  return (
    <div className="bg-gray-50 flex justify-evenly">
      {users.map((e, index) => (
        <div
          key={index}
          className={`h-4 w-4 p-3 rounded-full flex items-center justify-center `}
          style={{ backgroundColor: e.userColor }}
        >
          {e.userName[0]}
        </div>
      ))}
    </div>
  );
};

export default RoomMembers;
