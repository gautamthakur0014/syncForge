import React, { useRef, useMemo } from "react";
import Editor from "@monaco-editor/react";
import useEditorStore from "../../store/useEditorStore";
import useEditorSetup from "../../hooks/editor/useEditorSetup";
import useCursorSync from "../../hooks/editor/useCursorSync";
import useRemoteCursor from "../../hooks/socket/useRemoteCursor";
import useMonacoBinding from "../../hooks/yjs/useMonacoBinding";
import { createAwareness } from "../../yjs/awarenessManager";

const MonacoEditor = () => {
  const code = useEditorStore((state) => state.code);
  const theme = useEditorStore((state) => state.theme);
  const language = useEditorStore((s)=>s.language);
  console.log(language);
  

  const { handleEditorMount, editorRef,editor } = useEditorSetup();
  
  // useYjsProvider();
  useMonacoBinding(editor);
  useCursorSync(editorRef);
  useRemoteCursor(editorRef);

  return (
    <div className="h-full">
      <Editor
        height="100%"
        language={language}
        theme={theme}
        onMount={handleEditorMount}
        options={{
          fontSize: 14,
          fontFamily: "'JetBrains Mono', monospace",
          minimap: { enabled: false },
          padding: { top: 12 },
          smoothScrolling: true,
        }}
      />
    </div>
  );
};

export default MonacoEditor;
