import React from "react";
import useEditorStore from "../store/useEditorStore";

const Console = () => {
  const output = useEditorStore((state) => state.output);

  return (
    <div className="h-2/6 p-2 overflow-y-scroll bg-black text-white">
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
