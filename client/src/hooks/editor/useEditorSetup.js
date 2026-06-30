import { useRef,useState } from "react";

import useEditorStore from "../../store/useEditorStore";
import useRoomStore from "../../store/useRoomStore";
import {useCodeSync} from "./useCodeSync";

export default function useEditorSetup() {
  const editorRef = useRef(null);
   const [editor, setEditor] = useState(null);

  const handleEditorMount = (editorInstance) => {
    editorRef.current = editorInstance;
    setEditor(editorInstance);
  };


  return {
    editor,
    editorRef,
    handleEditorMount,
  };
}
