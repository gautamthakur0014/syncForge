import React from "react";
import { useNavigate } from "react-router-dom";
import useRoomStore from "../../store/useRoomStore";
import { LogOut } from "lucide-react";
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

  return (
    <button
      onClick={handleLeave}
      className="flex items-center gap-1.5 rounded-lg border border-red-500/30 bg-red-500/10 px-3.5 py-1.5 text-sm font-medium text-red-400 transition hover:bg-red-500/20"
    >
      <LogOut size={15} />
      Leave Room
    </button>
  );
};

export default RoomLeave;
