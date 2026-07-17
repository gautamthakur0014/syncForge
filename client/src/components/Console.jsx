import React from "react";
import useEditorStore from "../store/useEditorStore";

const Console = () => {
  const output = useEditorStore((state) => state.output);
  console.log(output);
  

  return (
    <div className=" p-2 overflow-y-scroll bg-black text-white w-1/2">
      {output && (
        <>
          {output.success ? (
            <pre>{output.output}</pre>
          ) : (
            <pre style={{ color: "red" }}>{output.error}</pre>
          )}
        </>
      )}
    </div>
  );
};

export default Console;
