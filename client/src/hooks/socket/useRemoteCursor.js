import { useEffect, useRef } from "react";

import { getSocket } from "../../utils/socket";

import { createCursorDecoration } from "../../utils/cursorDecoration";

const useRemoteCursor = (editorRef) => {
  const decorationsRef = useRef(new Map());

  useEffect(() => {
    const socket = getSocket();

    const handleCursorUpdate = ({userName, position }) => {
      if (!editorRef.current) return;

      const previous = decorationsRef.current.get(userName) || [];

      const next = editorRef.current.deltaDecorations(
        previous,
        createCursorDecoration(position, userName),
      );

      decorationsRef.current.set(userName, next);
    };

    socket.on("cursorUpdate", handleCursorUpdate);

    return () => {
      socket.off("cursorUpdate", handleCursorUpdate);

      decorationsRef.current.clear();
    };
  }, [editorRef]);
};

export default useRemoteCursor;
