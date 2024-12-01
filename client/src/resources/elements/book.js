import { bindable, inject } from "aurelia-framework";
import { EventAggregator } from "aurelia-event-aggregator";

@inject(EventAggregator)
export class Book {
  @bindable book;
  @bindable genres;
  @bindable shelves;
  @bindable searchTerm;

  constructor(eventAggregator) {
    this.eventAggregator = eventAggregator;
    this.editMode = false;
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
