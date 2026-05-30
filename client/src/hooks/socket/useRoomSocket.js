import { useEffect } from "react";
import { getSocket } from "../../utils/socket";

export const useRoomSocket = () => {
  const socket = getSocket();
  useEffect(() => {
    if (!roomId) return;

    socket.emit("joinRoom", {roomId, userName});
    socket.on("roomMembers", handleRoomMembers);
    socket.on("userJoined", handleUserJoined);
    socket.on("userLeft", handleUserLeft);

    return () => {
      socket.off("roomMembers");
      socket.off("userJoined");
      socket.off("userLeft");
    };
  }, [roomId]);
};
