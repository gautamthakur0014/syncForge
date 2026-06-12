import { useRef } from "react";
import throttle from "lodash/throttle";

import useRoomStore from "../../store/useRoomStore";
import { getSocket } from "../../utils/socket";

export const useCodeSync = () => {

  const emitCodeChange = useRef(
    throttle((roomId, code) => {
      if (!roomId) return;

      const socket = getSocket();
      socket.emit("sendCodeChange", {
        roomId,
        code,
      });
    }, 100),
  ).current;

  return emitCodeChange;
};
