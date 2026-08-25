import React from "react";
import { Code2, ChevronDown } from "lucide-react";
import useEditorStore from "../../store/useEditorStore";
import useRoomStore from "../../store/useRoomStore";
import { getSocket } from "../../utils/socket";

const LanguageSelector = () => {
  const language = useEditorStore((state) => state.language);
  const setLanguage = useEditorStore((state) => state.actions.setLanguage);
  const roomId = useRoomStore((s) => s.roomId);

  const handleLanguage = (e) => {
    const newLanguage = e.target.value;

    setLanguage(newLanguage);
    if (roomId) {
      getSocket().emit("updateLanguage", {
        roomId,
        language: newLanguage,
      });
    }
  };

  return (
    <div className="relative flex items-center">
      <label htmlFor="language" className="sr-only">
        Language
      </label>
      <Code2
        size={14}
        className="pointer-events-none absolute left-2.5 text-slate-400"
      />
      <select
        id="language"
        value={language}
        onChange={handleLanguage}
        className="appearance-none rounded-lg border border-surface-600 bg-surface-800 py-1.5 pl-8 pr-7 text-sm font-medium text-slate-200 outline-none transition hover:border-surface-500 focus:border-brand-500"
      >
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="cpp">C++</option>
        <option value="java">Java</option>
      </select>
      <ChevronDown
        size={14}
        className="pointer-events-none absolute right-2.5 text-slate-500"
      />
    </div>
  );
};

export default LanguageSelector;
