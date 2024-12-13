import { useShadowDOM, bindable } from "aurelia-framework";

// encapsulates the component within a Shadow DOM node
@useShadowDOM()
export class UxTextArea {
  // textContent used to represent the content of the text-area
  @bindable textContent;

  // number of rows in the text area
  @binable rows;

  constructor() {
    this.editMode = false;
  }

  bind() {
    // saves pre-edit text content in case the user cancels
    this.textContentTemp = this.textContent;
  }

  // switches the
}
