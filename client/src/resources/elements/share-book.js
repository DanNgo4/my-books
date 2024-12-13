import { inject } from "aurelia-framework";
import { DialogController } from "aurelia-dialog";

@inject(DialogController)
export class ShareBook {
  completedFont  = "fa fa-check fa-3x";
  completedStyle = "color: #27AE60";
  loadingFont    = "fa fa-spinner fa-pulse fa-3x fa-fw";

  constructor(dialogController) {
    this.controller = dialogController;
    this.state = "sharing";
  }

  // implements the activate() hook method and saves the book model
  activate(book) {
    this.book = book;
  }

  // sets the dialog into a loading state when the users click the OK button
  ok(book) {
    this.state = "loading";
    this.font = this.loadingFont;
    setTimeout(_ => this.controller.ok(book), 800);
  }
}
