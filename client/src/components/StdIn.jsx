import React, { useRef } from 'react'
import { PenLine } from "lucide-react";
import useEditorStore from '../store/useEditorStore';

const StdIn = () => {

  const input = useEditorStore((s)=>s.input);
  const setInput = useEditorStore((s)=>s.actions.setInput);

  return (
    <div className="flex h-1/2 min-h-0 flex-col bg-surface-950 sm:h-full sm:w-1/2">
      <div className="flex shrink-0 items-center gap-2 border-b border-surface-700 bg-surface-850 px-3 py-1.5">
        <PenLine size={13} className="text-slate-400" />
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Input (stdin)
        </span>
      </div>

      <textarea
        className="scrollbar-thin h-full w-full flex-1 resize-none bg-surface-950 p-3 font-mono text-[13px] leading-relaxed text-slate-200 outline-none placeholder:text-slate-600"
        placeholder="Type input for your program here…"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  );
}

export default StdIn
