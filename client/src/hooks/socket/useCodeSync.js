import { useEffect } from "react";
import useEditorStore from "../../store/useEditorStore";
import { Socket } from "socket.io-client";
import { getSocket } from "../../utils/socket";


export const useCodeSync = () => {
  const setCode = useEditorStore((state) => state.actions.setCode);

  useEffect(() => {
    const socket = getSocket();
    const handleCodeChange = ({ code }) => {
        console.log(code);
        
      setCode(code);
    };

    socket.on("receiveCodeChange", handleCodeChange);

    return () => {
      socket.off("receiveCodeChange", handleCodeChange);
    };
  }, []);
}
