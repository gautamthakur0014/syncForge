import { useEffect, useRef } from "react";
import throttle from "lodash/throttle";

import useRoomStore from "../../store/useRoomStore";
import { getSocket } from "../../utils/socket";

export default function useCursorSync(editorRef) {
  const roomId = useRoomStore((s) => s.roomId);

  const emitCursorMove = useRef(
    throttle((payload) => {
      getSocket().emit("cursorMove", payload);
    }, 50),
  ).current;

  useEffect(() => {
    if (!editorRef.current || !roomId) return;

    const disposable = editorRef.current.onDidChangeCursorPosition((e) => {
      emitCursorMove({
        roomId,
        position: {
          lineNumber: e.position.lineNumber,
          column: e.position.column,
        },
      });
    });

    return () => {
      disposable.dispose();
      emitCursorMove.cancel();
    };
  }, [roomId, editorRef, emitCursorMove]);
}
