// client\src\yjs\socketSyncManager.js

import * as Y from "yjs";

export const setupYjsSocketSync = ({ socket, roomId, ydoc }) => {
  const updateHandler = (update) => {
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
