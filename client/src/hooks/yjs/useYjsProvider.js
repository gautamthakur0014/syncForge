import { useEffect } from "react";

import useRoomStore from "../../store/useRoomStore";
import useYjsStore from "../../store/useYjsStore";

import { createYDoc } from "../../yjs/createYDoc";
import { createAwareness } from "../../yjs/awarenessManager";
import { setupYjsSocketSync } from "../../yjs/socketSyncManager";
import { getSocket } from "../../utils/socket";

export default function useYjsProvider() {
  const socket = getSocket();
  const roomId = useRoomStore((s) => s.roomId);

  const setYjs = useYjsStore((s) => s.actions.setYjs);
  const clearYjs = useYjsStore((s) => s.actions.clearYjs);

  useEffect(() => {
    if (!socket || !roomId) return;

    const { ydoc, yText } = createYDoc();

    const awareness = createAwareness(ydoc);

    setYjs({
      ydoc,
      yText,
      awareness,
    });

    const cleanupSocket = setupYjsSocketSync({
      socket,
      roomId,
      ydoc,
    });

    return () => {
      cleanupSocket();

      ydoc.destroy();

      clearYjs();
    };
  }, [socket, roomId]);
}
