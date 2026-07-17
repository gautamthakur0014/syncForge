import React from "react";
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
    <div>
      <label htmlFor="language"></label>
      <select id="language" value={language} onChange={handleLanguage}>
        <option value="javascript">Javascript </option>
        <option value="python">Python</option>
        <option value="cpp">C++</option>
        <option value="java">Java</option>
      </select>
    </div>
  );
};

export default LanguageSelector;
