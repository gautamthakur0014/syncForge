import { useRef } from "react";

import useEditorStore from "../../store/useEditorStore";
import useRoomStore from "../../store/useRoomStore";
import {useCodeSync} from "./useCodeSync";

export default function useEditorSetup() {
  const editorRef = useRef(null);

  const setCode = useEditorStore((s) => s.actions.setCode);
  const roomId = useRoomStore((s) =>(s.roomId));

  const emitCodeChange = useCodeSync();

  const handleEditorMount = (editor) => {
    editorRef.current = editor;
  };

  const handleChange = (value = "") => {
    
    setCode(value);

    emitCodeChange(roomId,value);
  };

  return {
    editorRef,
    handleEditorMount,
    handleChange,
  };
}
