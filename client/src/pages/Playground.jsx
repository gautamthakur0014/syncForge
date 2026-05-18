import { useEffect, useState } from "react";
import MonacoEditor from "../components/editor/MonacoEditor";
import Console from "../components/Console";
import { getSocket } from "../utils/socket";
import ToolBar from "../components/toolbar/ToolBar";

const Playground = () => {
  const roomId = 1234;
  const userName = "alex";
  


  return (
    <div className="p-1 m-0 h-screen">
      <ToolBar/>
      <MonacoEditor/>
      <Console/>
    </div>
  );
};

export default Playground;
