import { useEffect } from "react";
import useEditorStore from "../../store/useEditorStore";
import useRoomStore from "../../store/useRoomStore";
import { getSocket } from "../../utils/socket";

export const useEditorSettingsSync = () => {
  const roomId = useRoomStore((s) => s.roomId);

  const setLanguage = useEditorStore((s) => s.actions.setLanguage);
  const setTheme = useEditorStore((s) => s.actions.setTheme);

  useEffect(() => {
    const socket = getSocket();
    if (!roomId) return;

    const handleUpdatedLanguage = ({ updatedLanguage }) => {
      setLanguage(updatedLanguage);
    };

    const handleUpdatedTheme = ({ updatedTheme }) => {
      setTheme(updatedTheme);
    };

    socket.on("updatedLanguage", handleUpdatedLanguage);
    socket.on("updatedTheme", handleUpdatedTheme);

    return () => {
      socket.off("updatedLanguage", handleUpdatedLanguage);
      socket.off("updatedTheme", handleUpdatedTheme);
    };
  }, [roomId, setLanguage, setTheme]);
};
