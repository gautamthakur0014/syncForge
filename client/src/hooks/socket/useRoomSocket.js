import { useEffect } from "react";
import { getSocket } from "../../utils/socket";
import useRoomStore from "../../store/useRoomStore";
import useEditorStore from "../../store/useEditorStore";

export const useRoomSocket = () => {
  const { actions, userName, roomId, isInRoom, users } = useRoomStore();
  const editorStore = useEditorStore();

  useEffect(() => {
    const socket = getSocket();

    const handleRoomMembers = ( {members, roomState} ) => {
      // console.log(members.map((e)=>(e.userName)));
      
      editorStore.actions.setCode(roomState.code);
      editorStore.actions.setLanguage(roomState.language);
      editorStore.actions.setTheme(roomState.theme);
      
      actions.setUsers(members || []);
    };

    const handleUserJoined = ({ joinedUser }) => {
      console.log(joinedUser.userName + " joined");
      actions.addUser(joinedUser);
    };
    const handleUserLeft = ({ leavedUserName }) => {
      console.log(leavedUserName + " leaved");
      actions.removeUser(leavedUserName);
    };

    if (!roomId) return;

    // socket.emit("joinRoom", { roomId, userName });
    socket.on("roomMembers", handleRoomMembers);
    socket.on("userJoined", handleUserJoined);
    socket.on("userLeft", handleUserLeft);
    socket.on("roomError", ({ message }) => {
      alert(message);
    });

    return () => {
      socket.off("roomMembers");
      socket.off("userJoined");
      socket.off("userLeft");
      socket.off("roomError");
    };
  }, [roomId]);
};
