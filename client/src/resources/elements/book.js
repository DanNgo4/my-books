import { bindable, inject } from "aurelia-framework";
import { EventAggregator } from "aurelia-event-aggregator";
import { DialogService } from "aurelia-dialog";

import { ShareBook } from "./share-book";

@inject(EventAggregator, DialogService)
export class Book {
  @bindable book;
  @bindable genres;
  @bindable shelves;
  @bindable searchTerm;

  constructor(eventAggregator, dialogService) {
    this.eventAggregator = eventAggregator;
    this.editMode = false;
    this.dialogService = dialogService;
  }

  // marks a book as read and stamps it with a readDate
  markRead() {
    this.book.readDate = new Date();
    this.book.read = true;
  }

  removeBook() {
    // triggers a book-removed event to be picked up by a parent component
    this.eventAggregator.publish("book-removed", this.book);  
  }

  // receives an edit-mode-changed event the view and changes the edit mode 
  toggleEditMode(event) {
    this.editMode = !this.editMode;
  }

  share() {
    // opens the share-book dialog when the Share button is clicked
    this.dialogService
      .open({
        viewModel: ShareBook, // uses the ShareBook component as the share-book dialog content
        model: this.book  // passes the current book to the dialog
      })
      .whenClosed(response => {});  // any empty handler included for demonstration purposes
  }

  bind() {
    // subscribes to events using the EventAggregator
    this.subscribeToEvents();
  }

  subscribeToEvents() {
    this.editModeChangedSubscription = this.eventAggregator.subscribe(
      "edit-mode-changed",
      mode => {
        this.editMode = mode;
      }
    );
  }

  unbind() {
    // cleanup of EventAggregator subscription
    this.editModeChangedSubscription.dispose();
  }
}
