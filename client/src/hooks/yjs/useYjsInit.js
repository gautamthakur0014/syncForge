import { useEffect } from "react";

import useYjsStore from "../../store/useYjsStore";

import { createYDoc } from "../../yjs/createYDoc";
import { createAwareness } from "../../yjs/awarenessManager";

export const useYjsInit = () => {
  const setYjs = useYjsStore((s) => s.actions.setYjs);
  const clearYjs = useYjsStore((s) => s.actions.clearYjs);

  console.log("Creating Yjs");

  useEffect(() => {
    console.log("running");
    
    const { ydoc, yText } = createYDoc();

    const awareness = createAwareness(ydoc);

    setYjs({
      ydoc,
      yText,
      awareness,
    });

    return () => {
      ydoc.destroy();
      clearYjs();
    };
  }, []);
}
