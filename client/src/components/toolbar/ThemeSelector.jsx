import React from "react";
import useEditorStore from "../../store/useEditorStore";
import useRoomStore from "../../store/useRoomStore";
import { getSocket } from "../../utils/socket";

const ThemeSelector = () => {
  const theme = useEditorStore((state) => state.theme);
  const setTheme = useEditorStore((state) => state.actions.setTheme);
  const roomId = useRoomStore((s) => s.roomId);

  const handleTheme = (e) => {
    const newTheme = e.target.value;

    setTheme(newTheme);

    if (roomId) {
      getSocket().emit("updateTheme", {
        roomId,
        theme: newTheme,
      });
    }
  };
  return (
    <div>
      <label htmlFor="theme"></label>
      <select id="theme" value={theme} onChange={handleTheme}>
        <option value="vs">light</option>
        <option value="vs-dark">dark</option>
        <option value="hc-black">High Contrast Dark</option>
        <option value="hc-light">High Contrast Light</option>
      </select>
    </div>
  );
};

export default ThemeSelector;
