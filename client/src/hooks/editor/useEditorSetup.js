import { useRef } from "react";

import useEditorStore from "../../store/useEditorStore";
import useRoomStore from "../../store/useRoomStore";
import {useCodeSync} from "./useCodeSync";

export default function useEditorSetup() {
  const editorRef = useRef(null);

  const handleEditorMount = (editor) => {
    editorRef.current = editor;
  };


  return {
    editorRef,
    handleEditorMount,
  };
}
