import React, { useRef, useState } from "react";
import ExecuteCode from "./ExecuteCode";
import LanguageSelector from "./LanguageSelector";
import RoomDropdown from "./RoomDropdown";
import RoomMembers from "./RoomMembers";
import ThemeSelector from "./ThemeSelector";
import useRoomStore from "../../store/useRoomStore";
import RoomLeave from "./RoomLeave";

const ToolBar = () => {
  const isInRoom = useRoomStore((s) => s.isInRoom);

  return (
    <div className="flex flex-wrap items-center gap-3 border-b border-surface-700 bg-surface-850 px-3 py-2 sm:px-4">
      {/* Brand */}
      <div className="mr-1 flex items-center gap-2">
        {/* <div className="flex h-7 w-7 items-center justify-center rounded-md bg-brand-500">
          
        </div> */}
        <span className="hidden font-display text-sm font-semibold text-white sm:inline">
          syncForge
        </span>
      </div>

      <div className="h-6 w-px bg-surface-600" />

      <ExecuteCode />
      <LanguageSelector />
      <ThemeSelector />

      {/* Push room controls to the right on wider screens */}
      <div className="ml-auto flex items-center gap-3">
        <RoomMembers />
        {isInRoom ? <RoomLeave /> : <RoomDropdown />}
      </div>
    </div>
  );
};

export default ToolBar;
