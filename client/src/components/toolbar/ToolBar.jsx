import React, { useRef, useState } from "react";
import ExecuteCode from "./ExecuteCode";
import LanguageSelector from "./LanguageSelector";
import RoomDropdown from "./RoomDropdown";
import RoomMembers from "./RoomMembers";
import ThemeSelector from "./ThemeSelector";
import useRoomStore from "../../store/useRoomStore";
import RoomLeave from "./RoomLeave";

const ToolBar = () => {

    const isInRoom = useRoomStore((s)=> s.isInRoom);


  return (
    <div className="flex justify-evenly items-center">
      <ExecuteCode/>
      <LanguageSelector/>
      {isInRoom?(<RoomLeave/>) : <RoomDropdown/>}
      <RoomMembers/>
      <ThemeSelector/>
    </div>
  );
};

export default ToolBar;


