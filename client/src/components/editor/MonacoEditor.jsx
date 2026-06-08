import React, { useRef } from "react";
import Editor from "@monaco-editor/react";
import useEditorStore from "../../store/useEditorStore";
import useRoomStore from "../../store/useRoomStore";
import throttle from "lodash/throttle";
import { getSocket } from "../../utils/socket";


const MonacoEditor = () => {

  const code = useEditorStore((state)=>state.code);
  const setCode = useEditorStore((state)=>state.actions.setCode);
  const theme = useEditorStore((state)=>state.theme);
  const roomId = useRoomStore((state)=> state.roomId);

  

  function handleEditorDidMount(editor, monaco) {
    console.log("Editor instance:", editor);
    console.log("Monaco instance:", monaco);
  }


  const emitCodeChange = throttle((code) => {
    const socket = getSocket();
    console.log(code);
    
    socket.emit("sendCodeChange", {
      roomId,
      code,
    });
  }, 100);

  const handleChange = (value) => {
    setCode(value);
    emitCodeChange(value);
  };

  return (
    <div className="h-4/6">
      <Editor
        height="100%"
        language="javascript"
        value={code}
        theme={theme}
        // onMount={handleEditorDidMount}
        onChange={handleChange}
      />
    </div>
  );
};

export default MonacoEditor;
