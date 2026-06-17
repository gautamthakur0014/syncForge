import React, { useRef, useState } from "react";
import ExecuteCode from "./ExecuteCode";
import LanguageSelector from "./LanguageSelector";
import RoomDropdown from "./RoomDropdown";
import RoomMembers from "./RoomMembers";
import ThemeSelector from "./ThemeSelector";

const ToolBar = ({ fetchData }) => {
    const roomIdRef = useRef(null);
    const usernameRef = useRef(null);
     const [theme, setTheme] = useState("light");

     const handleSubmit = (e) => {
       e.preventDefault();

       const data = {
         theme,
         roomId: roomIdRef.current.value,
         username: usernameRef.current.value,
       };

     };


  return (
    <div className="flex justify-evenly items-center">
      <ExecuteCode/>
      <LanguageSelector/>
      <RoomDropdown/>
      <RoomMembers/>
      <ThemeSelector/>
    </div>
  );
};

export default ToolBar;


