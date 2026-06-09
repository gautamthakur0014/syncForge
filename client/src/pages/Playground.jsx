import MonacoEditor from "../components/editor/MonacoEditor";
import Console from "../components/Console";
import ToolBar from "../components/toolbar/ToolBar";
import { useRoomSocket } from "../hooks/socket/useRoomSocket";
import {useCodeSync} from "../hooks/socket/useCodeSync";

const Playground = () => {
  useRoomSocket();
  useCodeSync();
  


  return (
    <div className="p-1 m-0 h-screen">
      <ToolBar/>
      <MonacoEditor/>
      <Console/>
    </div>
  );
};

export default Playground;
