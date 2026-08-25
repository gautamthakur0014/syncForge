import React from "react";
import { Palette, ChevronDown } from "lucide-react";
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
    <div className="relative flex items-center">
      <label htmlFor="theme" className="sr-only">
        Editor theme
      </label>
      <Palette
        size={14}
        className="pointer-events-none absolute left-2.5 text-slate-400"
      />
      <select
        id="theme"
        value={theme}
        onChange={handleTheme}
        className="appearance-none rounded-lg border border-surface-600 bg-surface-800 py-1.5 pl-8 pr-7 text-sm font-medium text-slate-200 outline-none transition hover:border-surface-500 focus:border-brand-500"
      >
        <option value="vs">Light</option>
        <option value="vs-dark">Dark</option>
        <option value="hc-black">High Contrast Dark</option>
        <option value="hc-light">High Contrast Light</option>
      </select>
      <ChevronDown
        size={14}
        className="pointer-events-none absolute right-2.5 text-slate-500"
      />
    </div>
  );
};

export default ThemeSelector;
