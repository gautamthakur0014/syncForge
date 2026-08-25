import MonacoEditor from "../components/editor/MonacoEditor";
import Console from "../components/Console";
import ToolBar from "../components/toolbar/ToolBar";
import { useRoomSocket } from "../hooks/socket/useRoomSocket";
// import {useCodeSync} from "../hooks/socket/useCodeSync";
import StdIn from "../components/StdIn";
import { useInputOutput } from "../hooks/socket/useInputOutput";
import { useEditorSettingsSync } from "../hooks/socket/useEditorSettingsSync";

const Playground = () => {
  useRoomSocket();
  // useCodeSync();
  useInputOutput();
  useEditorSettingsSync();

  return (
    <div className="flex h-screen flex-col bg-surface-900">
      <ToolBar />
      <div className="h-3/5 min-h-0 sm:h-2/3">
        <MonacoEditor />
      </div>
      <div className="flex h-2/5 min-h-0 flex-col sm:h-1/3 sm:flex-row">
        <Console />
        <StdIn />
      </div>
    </div>
  );
};

export default Playground;
