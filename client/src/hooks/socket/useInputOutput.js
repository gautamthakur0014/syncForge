import { useEffect, useRef } from "react";
import useEditorStore from "../../store/useEditorStore";
import { getSocket } from "../../utils/socket";
import useRoomStore from "../../store/useRoomStore";

export const useInputOutput = () => {
  const input = useEditorStore((s) => s.input);
  const setInput = useEditorStore((s) => s.actions.setInput);
  const setOutput = useEditorStore((s) => s.actions.setOutput);

  const roomId = useRoomStore((s) => s.roomId);

  const isRemoteUpdate = useRef(false);

  useEffect(() => {
    if (!roomId) return;

    if (isRemoteUpdate.current) {
      isRemoteUpdate.current = false;
      return;
    }

    const socket = getSocket();

    socket.emit("sendInput", {
      roomId,
      input,
    });
  }, [input, roomId]);

  useEffect(() => {
    if (!roomId) return;

    const socket = getSocket();

    const handleReceivedInput = ({ receivedInput }) => {
      isRemoteUpdate.current = true;
      setInput(receivedInput);
    };

    const handleOutputUpdate = (result) => {
      console.log(result);
      
      setOutput(result);
    };

    socket.on("receiveInput", handleReceivedInput);
    socket.on("outputUpdate", handleOutputUpdate);

    return () => {
      socket.off("receiveInput", handleReceivedInput);
      socket.off("outputUpdate", handleOutputUpdate);
    };
  }, [roomId, setInput, setOutput]);
};
