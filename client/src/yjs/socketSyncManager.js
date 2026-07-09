// client\src\yjs\socketSyncManager.js

import * as Y from "yjs";

export const setupYjsSocketSync = ({ socket, roomId, ydoc }) => {

  const initialState = Array.from(Y.encodeStateAsUpdate(ydoc));
  if (initialState.length > 2) {
    // length > 2 means it has actual content
    socket.emit("yjs-update", { roomId, update: initialState });
  }
  
  const updateHandler = (update, origin) => {
    if (origin === "remote") return;
    socket.emit("yjs-update", {
      roomId,
      update: Array.from(update),
    });
  };

  ydoc.on("update", updateHandler);

  socket.on("yjs-update", ({ update }) => {
    Y.applyUpdate(ydoc, new Uint8Array(update));
  });

  return () => {

    ydoc.off("update", updateHandler);
    socket.off("yjs-update");
  };
};
