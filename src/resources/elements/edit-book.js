import { bindable, inject, computedFrom } from "aurelia-framework";
import { EventAggregator } from "aurelia-event-aggregator";
import _ from "lodash";

@inject(EventAggregator)
export class EditBook {
  @bindable editMode;
  @bindable book;

  constructor(eventAggregator) {
    this.resetTempBook();
    this.eventAggregator = eventAggregator;
  }

  bind() {
    // resets the book value to the temporary value to undo changes
    this.resetTempBook();
  }

  attached() {
    this.bookSaveCompleteSubscription = this.eventAggregator.subscribe(
      `book-save-complete-${this.book.id}`, 
      () => this.bookSaveComplete()
    );
  }

  // watches for the editMode change and reset the temporary book
  editModeChanged(editModeNew, editModeOld) {
    if (editModeNew) this.resetTempBook();
  }

  // books can be saved if they have been edited
  @computedFrom("temporaryBook.title", "temporaryBook.description")
  get canSave() {
    return this.temporaryBook && !_.isEqual(this.temporaryBook, this.book);
  }

  // reset the temporary book ready for the next edit
  resetTempBook() {
    this.temporaryBook = Object.assign({}, this.book);
  }

  // cancels the delegate method, reverts changes on the book and closes the edit form
  cancel() {
    this.temporaryBook = this.book;
    this.toggleEditMode();
  }

  save() {
    // sets the loading state on the form prior to initialising the async task
    this.loading = true;

    this.publishBooksSavedEvent();
  }

  // method to be called when the book has been saved
  bookSaveComplete() {
    // removes the loading status
    this.loading = false;

    // sets the saved status temporarily to show a tick when saved
    this.saved = true;

    // hides the success-indicator icon (tick) by toggling the saved state, and closes the edit form
    setTimeout(() => {
      this.resetTempBook();
      this.saved = false;
      this.toggleEditMode();
    }, 500);
  }

  // publishes the book-saved event to be picked up by the parent component
  publishBooksSavedEvent() {
    this.eventAggregator.publish("saved-book", this.temporaryBook);
  }

  // toggles the edit mode to close the form when edits are complete
  toggleEditMode() {
    this.eventAggregator.publish("edit-mode-changed", !this.editMode);
  }

  detached() {
    // cleans up the Event Aggregator subscription
    this.bookSaveCompleteSubscription.dispose();
  }
}
