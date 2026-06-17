import * as monaco from "monaco-editor";

export const createCursorDecoration = (position, userName) => {
  return [
    {
      range: new monaco.Range(
        position.lineNumber,
        position.column,
        position.lineNumber,
        position.column,
      ),

      options: {
        beforeContentClassName: "remote-cursor",

        hoverMessage: {
          value: userName,
        },

        stickiness:
          monaco.editor.TrackedRangeStickiness.NeverGrowsWhenTypingAtEdges,
      },
    },
  ];
};
