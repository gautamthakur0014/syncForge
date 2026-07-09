import { useEffect } from "react";

import useYjsStore from "../../store/useYjsStore";
import { createBinding } from "../../yjs/monacoBindingManager";

export default function useMonacoBinding(editor) {
  const yText = useYjsStore((s) => s.yText);
  const awareness = useYjsStore((s) => s.awareness);

  useEffect(() => {
    if (!editor) return;
    if (!yText) return;
    if (!awareness) return;

    const binding = createBinding({
      yText,
      editor,
      awareness,
    });

    return () => {
      binding.destroy();
    };
  }, [editor, yText, awareness]);
}
