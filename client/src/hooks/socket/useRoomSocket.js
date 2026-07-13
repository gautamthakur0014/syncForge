import { useEffect } from "react";
import { getSocket } from "../../utils/socket";
import useRoomStore from "../../store/useRoomStore";
import useEditorStore from "../../store/useEditorStore";
import * as Y from "yjs";
import useYjsStore from "../../store/useYjsStore";

export const useRoomSocket = () => {
  const { actions, userName, roomId, isInRoom, users } = useRoomStore();
  const editorStore = useEditorStore();
  const ydoc = useYjsStore((s) => s.ydoc);
  const language = useEditorStore((s) => s.language);
  const theme = useEditorStore((s) => s.theme);
  const input = useEditorStore((s) => s.input);
  const setInput = useEditorStore((s)=> s.actions.setInput);
  const output = useEditorStore((s)=> s.output);
  const setOutput = useEditorStore((s) => s.actions.setOutput);
  const useName = useRoomStore((s) => s.userName);

  useEffect(() => {
    const socket = getSocket();
    if (!roomId || !ydoc) return;
     const stateVector = Array.from(Y.encodeStateVector(ydoc));
    socket.emit("joinRoom", {
      roomId,
      userName,
      state: { language, theme, input, output },
      ydocStateVector: stateVector,
    });

    const handleRoomMembers = ({ members, roomState, ydocState }) => {
      if (!ydoc) return;

      if (ydocState) {
        Y.applyUpdate(ydoc, new Uint8Array(ydocState), "origin");
      }
      editorStore.actions.setLanguage(roomState.language);
      editorStore.actions.setTheme(roomState.theme);
      editorStore.actions.setInput(roomState.input);
      editorStore.actions.setOutput(roomState.output);

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
  }, [roomId, ydoc]);
};
