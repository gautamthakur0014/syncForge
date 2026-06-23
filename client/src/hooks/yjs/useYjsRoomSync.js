import { useEffect } from "react";

import useRoomStore from "../../store/useRoomStore";
import useYjsStore from "../../store/useYjsStore";

import { getSocket } from "../../utils/socket";
import { setupYjsSocketSync } from "../../yjs/socketSyncManager";

export const useYjsRoomSync =() => {
  const socket = getSocket();

  const roomId = useRoomStore((s) => s.roomId);

  const ydoc = useYjsStore((s) => s.ydoc);

  useEffect(() => {
    if (!socket || !roomId || !ydoc) return;

    const cleanupSocket = setupYjsSocketSync({
      socket,
      roomId,
      ydoc,
    });

    return cleanupSocket;
  }, [socket, roomId, ydoc]);
}
