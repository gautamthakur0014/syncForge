import * as monaco from "monaco-editor";

export default class CursorLabelWidget {
  constructor(editor, userName, color, position) {
    this.editor = editor;

    this.id = `cursor-label-${userName}`;

    this.position = position;

    this.domNode = document.createElement("div");

    this.domNode.className = "remote-cursor-label";

    this.domNode.textContent = userName;

    this.domNode.style.background = color;
  }

  getId() {
    return this.id;
  }

  getDomNode() {

    return this.domNode;
  }

  getPosition() {

    return {
      position: this.position,

      preference: [monaco.editor.ContentWidgetPositionPreference.BELOW],
    };
  }

  update(position) {
    this.position = position;
  }
}
