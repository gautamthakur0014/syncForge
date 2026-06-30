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

  const { handleEditorMount, editorRef,editor } = useEditorSetup();
  
  // useYjsProvider();
  useMonacoBinding(editor);
  useCursorSync(editorRef);
  useRemoteCursor(editorRef);

  return (
    <div className="h-4/6">
      <Editor
        height="100%"
        language="javascript"
        theme={theme}
        onMount={handleEditorMount}
      />
    </div>
  );
};

export default MonacoEditor;
