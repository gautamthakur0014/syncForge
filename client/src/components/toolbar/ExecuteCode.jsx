import React from "react";
import useEditorStore from "../../store/useEditorStore";
import axios from "axios";

const ExecuteCode = () => {
  const code = useEditorStore((state) => state.code);
  const language = useEditorStore((state) => state.language);

  const setOutput = useEditorStore((state) => state.setOutput);
  const setIsRunning = useEditorStore((state) => state.setIsRunning);
  const isRunning = useEditorStore((state)=>state.isRunning);

  const runCode = async () => {
    
    try {
      setIsRunning(true);

    const res = await axios({
      method: "post",
      url: "http://localhost:5000/api/v1/execute",
      data: {
        language,
        code,
      },
    });
console.log(res);

      setOutput(res.data);
    } catch (err) {
      setOutput(err);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <button className="bg-black text-2xl text-red-700" onClick={runCode}>
      {isRunning?"running":"run"}
    </button>
  );
};

export default ExecuteCode;
