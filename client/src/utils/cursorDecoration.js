import * as monaco from "monaco-editor";

export const createCursorDecoration = (position, userName) => {
  return [
    {
      range: new monaco.Range(
        position.line,
        position.column,
        position.line,
        position.column,
      ),

      options: {
        className: "remote-cursor",

        hoverMessage: {
          value: userName,
        },

        stickiness:
          monaco.editor.TrackedRangeStickiness.NeverGrowsWhenTypingAtEdges,
      },
    },
  ];
};
