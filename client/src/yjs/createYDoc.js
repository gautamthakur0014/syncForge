// client\src\yjs\createYDoc.js

import * as Y from "yjs";
import useEditorStore from "../store/useEditorStore";
import { starterTemplates } from "../utils/starterTemplate";

export const createYDoc = () => {
  const language = useEditorStore.getState().language;
  const ydoc = new Y.Doc();
  const yText = ydoc.getText("editor");

  // Default language is JavaScript
  if (yText.length === 0) {
    yText.insert(0, starterTemplates[language]);
  }
  yText.observe(() => {
    useEditorStore.getState().actions.setCode(yText.toString());
  });

  return {
    ydoc,
    yText: ydoc.getText("editor"),
  };
};
