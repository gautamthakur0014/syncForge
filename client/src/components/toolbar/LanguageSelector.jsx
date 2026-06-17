import React from 'react'
import useEditorStore from '../../store/useEditorStore';

const LanguageSelector = () => {
  const language = useEditorStore((state)=>state.language);
  const setLanguage = useEditorStore((state)=>state.actions.setLanguage);
  return (
    <div>
      <label htmlFor="language"></label>
      <select
        id="language"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >
        <option value="javaScript">JavaScript </option>
        {/* <option value="Python">Python</option>
        <option value="C++">C++</option> */}
      </select>
    </div>
  );
}

export default LanguageSelector
