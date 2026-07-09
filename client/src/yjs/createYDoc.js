// client\src\yjs\createYDoc.js

import * as Y from "yjs";
import useEditorStore from "../store/useEditorStore";

export const createYDoc = () => {
  const ydoc = new Y.Doc();
  const yText = ydoc.getText("editor");
  yText.observe(() => {
    
    useEditorStore.getState().actions.setCode(yText.toString());
  });

  return {
    ydoc,
    yText: ydoc.getText("editor"),
  };
};
