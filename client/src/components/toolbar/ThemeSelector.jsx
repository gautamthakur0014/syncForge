import React from 'react'
import useEditorStore from '../../store/useEditorStore';

const ThemeSelector = () => {
  const theme = useEditorStore((state)=>state.theme);
  const setTheme = useEditorStore((state)=>state.actions.setTheme)
  return (
    <div>
      <label htmlFor="theme"></label>
      <select
        id="theme"
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
      >
        <option value="vs">light</option>
        <option value="vs-dark">dark</option>
        <option value="hc-black">High Contrast Dark</option>
        <option value="hc-light">High Contrast Light</option>
      </select>
    </div>
  );
}

export default ThemeSelector
