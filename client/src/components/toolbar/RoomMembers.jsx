import React from "react";
import useRoomStore from "../../store/useRoomStore";

const RoomMembers = () => {
  const users = useRoomStore((s) => s.users);
  if (!users || users.length === 0) return null;

  const visible = users.slice(0, 4);
  const overflow = users.length - visible.length;

  return (
    <div className="flex items-center -space-x-2">
      {visible.map((e, index) => (
        <div
          key={index}
          title={e.userName}
          className="group relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-surface-850 text-xs font-semibold uppercase text-white shadow-sm ring-1 ring-black/20 transition hover:z-10 hover:scale-105"
          style={{ backgroundColor: e.userColor }}
        >
          {e.userName[0]}

          <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-surface-700 px-2 py-1 text-[11px] font-medium normal-case text-slate-200 opacity-0 shadow-lg transition group-hover:opacity-100">
            {e.userName}
          </span>
        </div>
      ))}

      {overflow > 0 && (
        <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-surface-850 bg-surface-600 text-[11px] font-semibold text-slate-200 ring-1 ring-black/20">
          +{overflow}
        </div>
      )}
    </div>
  );
};

export default RoomMembers;
