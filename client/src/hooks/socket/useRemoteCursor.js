import { useEffect, useRef } from "react";
import { getSocket } from "../../utils/socket";
import { createCursorDecoration } from "../../utils/cursorDecoration";
import { ensureCursorStyle } from "../../utils/monaco/cursorStyleManager";
import CursorLabelWidget from "../../utils/monaco/cursorLabelWidget";

const useRemoteCursor = (editorRef) => {
  const decorationsRef = useRef(new Map());
  const widgetsRef = useRef(new Map());

  useEffect(() => {
    const socket = getSocket();

    const handleCursorUpdate = ({ userName, userColor, position }) => {
      if (!editorRef.current) return;

      const editor = editorRef.current;

      const className = ensureCursorStyle(userName, userColor);

      const previous = decorationsRef.current.get(userName) || [];

      const next = editorRef.current.deltaDecorations(
        previous,
        createCursorDecoration(position, className),
      );

      decorationsRef.current.set(userName, next);

      let widget = widgetsRef.current.get(userName);

      if (!widget) {
          console.log("creating widget");
          console.log(position);
          
        widget = new CursorLabelWidget(editor, userName, userColor, position);

        editor.addContentWidget(widget);

        widgetsRef.current.set(userName, widget);
      } else {
        widget.update(position);

        editor.layoutContentWidget(widget);
      }
    };

    socket.on("cursorUpdate", handleCursorUpdate);

    return () => {
      socket.off("cursorUpdate", handleCursorUpdate);
       widgetsRef.current.forEach((widget) => {
         editorRef.current?.removeContentWidget(widget);
       });

         widgetsRef.current.clear();

      decorationsRef.current.clear();
    };
  }, [editorRef]);
};

export default useRemoteCursor;
