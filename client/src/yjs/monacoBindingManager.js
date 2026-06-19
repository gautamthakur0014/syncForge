// client\src\yjs\monacoBindingManager.js

import { MonacoBinding } from "y-monaco";

export const createBinding = ({ yText, editor, awareness }) => {
  return new MonacoBinding(
    yText,
    editor.getModel(),
    new Set([editor]),
    awareness,
  );
};
