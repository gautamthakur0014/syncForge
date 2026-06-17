import React from "react";
import useEditorStore from "../../store/useEditorStore";
import axios from "axios";

const ExecuteCode = () => {

  const{actions} = useEditorStore();
  const isRunning = useEditorStore((state)=> state.isRunning);

  return (
    <button className="bg-black text-2xl text-red-700" onClick={actions.runCode}>
      {isRunning?"running":"run"}
    </button>
  );
};

export default ExecuteCode;
