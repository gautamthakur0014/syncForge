import { useEffect } from "react";
import { getSocket } from "../../utils/socket";
import useRoomStore from "../../store/useRoomStore";

export const useRoomSocket = () => {
  const { actions, userName, roomId, isInRoom, users } = useRoomStore();

  useEffect(() => {
    const socket = getSocket();

    const handleRoomMembers = ({ members }) => {
      console.log(members + "members");
      actions.setUsers(members || []);
    };

    const handleUserJoined = ({ joinedUserName }) => {
      console.log(joinedUserName + "joined");
      actions.addUser(joinedUserName);
    };
    const handleUserLeft = ({ leavedUserName }) => {
      console.log(leavedUserName);
      actions.removeUser(leavedUserName);
    };

    if (!roomId) return;

    // socket.emit("joinRoom", { roomId, userName });
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
