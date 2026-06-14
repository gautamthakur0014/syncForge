import React, { useRef } from "react";
import Editor from "@monaco-editor/react";
import useEditorStore from "../../store/useEditorStore";
import useEditorSetup from "../../hooks/editor/useEditorSetup";
import useCursorSync from "../../hooks/editor/useCursorSync";
import useRemoteCursor from "../../hooks/socket/useRemoteCursor";



const MonacoEditor = () => {
  
  const code = useEditorStore((state)=>state.code);
  const theme = useEditorStore((state)=>state.theme);
  
  const { handleEditorMount, handleChange, editorRef } = useEditorSetup();

  useCursorSync(editorRef);
  useRemoteCursor(editorRef);

  return (
    <div className="h-4/6">
      <Editor
        height="100%"
        language="javascript"
        value={code}
        theme={theme}
        onMount={handleEditorMount}
        onChange={handleChange}
      />
    </div>
  );
};

export default MonacoEditor;
