import { useEffect } from "react";

import useYjsStore from "../../store/useYjsStore";
import { createBinding } from "../../yjs/monacoBindingManager";

export default function useMonacoBinding(editorRef) {
  const yText = useYjsStore((s) => s.yText);
  const awareness = useYjsStore((s) => s.awareness);

  useEffect(() => {
     console.log({
       editor: !!editorRef.current,
       yText: !!yText,
       awareness: !!awareness,
     });
    if (!editorRef.current) return;
    if (!yText) return;
    if (!awareness) return;

    const binding = createBinding({
      yText,
      editor: editorRef.current,
      awareness,
    });

    return () => {
      binding.destroy();
    };
  }, [editorRef, yText, awareness]);
}
