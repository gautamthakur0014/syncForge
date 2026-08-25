import React from "react";
import useEditorStore from "../../store/useEditorStore";
import { Play, Loader2 } from "lucide-react";

const ExecuteCode = () => {
  const { actions } = useEditorStore();
  const isRunning = useEditorStore((state) => state.isRunning);

  return (
    <button
      onClick={actions.runCode}
      disabled={isRunning}
      className="flex items-center gap-1.5 rounded-lg bg-run-500 px-3.5 py-1.5 text-sm font-semibold text-white shadow-sm transition hover:bg-run-600 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {isRunning ? (
        <>
          <Loader2 size={15} className="animate-spin" />
          Running
        </>
      ) : (
        <>
          <Play size={15} fill="currentColor" />
          Run
        </>
      )}
    </button>
  );
};

export default ExecuteCode;
