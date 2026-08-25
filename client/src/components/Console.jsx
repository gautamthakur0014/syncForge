import React from "react";
import { Terminal } from "lucide-react";
import useEditorStore from "../store/useEditorStore";

const Console = () => {
  const output = useEditorStore((state) => state.output);
  console.log(output);
  

  return (
    <div className="flex h-1/2 min-h-0 flex-col border-b border-surface-700 bg-surface-950 sm:h-full sm:w-1/2 sm:border-b-0 sm:border-r">
      <div className="flex shrink-0 items-center gap-2 border-b border-surface-700 bg-surface-850 px-3 py-1.5">
        <Terminal size={13} className="text-slate-400" />
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Output
        </span>
      </div>

      <div className="scrollbar-thin flex-1 overflow-y-auto p-3 font-mono text-[13px] leading-relaxed">
        {output ? (
          output.success ? (
            <pre className="whitespace-pre-wrap text-slate-200">
              {output.output}
            </pre>
          ) : (
            <pre className="whitespace-pre-wrap text-red-400">
              {output.error}
            </pre>
          )
        ) : (
          <p className="text-slate-500">Run your code to see output here.</p>
        )}
      </div>
    </div>
  );
};

export default Console;
