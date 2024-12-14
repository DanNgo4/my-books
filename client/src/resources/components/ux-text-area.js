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

  // switches the text-area to edit mode and switches focus to the current element
  edit() {
    this.editMode = true;

    setTimeout(_ => {
      this.element.focus();
    }, 1);
  }

  // saves the temporary text for the text-area
  ok() {
    this.editMode = false;
    this.textContent = this.textContentTemp;
  }

  // undoes the text changes by reverting by reverting to the temporary text
  cancel() {
    this.editMode = false;
    this.textContentTemp = this.textContent;
  }
}
