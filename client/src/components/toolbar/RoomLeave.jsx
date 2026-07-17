import React from "react";
import { useNavigate } from "react-router-dom";
import useRoomStore from "../../store/useRoomStore";
import { getSocket } from "../../utils/socket";

const RoomLeave = () => {
  const navigate = useNavigate();

  const roomId = useRoomStore((s) => s.roomId);

  const handleLeave = () => {
    const socket = getSocket();

    socket.emit("leaveRoom");

    // Clear local room state
    useRoomStore.getState().actions.leaveRoom();

    // Navigate away
    // navigate("/");
  };

  return <button onClick={handleLeave}>Leave Room</button>;
};

export default RoomLeave;
