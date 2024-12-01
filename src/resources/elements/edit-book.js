import { bindable, inject, computedFrom, NewInstance } from "aurelia-framework";
import { EventAggregator } from "aurelia-event-aggregator";
import { ValidationRules, ValidationController } from "aurelia-validation";

import _ from "lodash";

import { BootstrapFormRenderer } from "../../renderers/bootstrap-form-renderer";

export class Book {
  title = "";
  description = "";
  timesRead = 0;
}

@inject(EventAggregator, NewInstance.of(ValidationController))
export class EditBook {
  @bindable editMode;
  @bindable book;
  @bindable selectedGenre;
  @bindable genres;
  @bindable shelves;
  temporaryBook = new Book();

  constructor(eventAggregator, validationController) {
    this.resetTempBook();
    this.eventAggregator = eventAggregator;

    // creates a handler method for rating-changed events
    this.ratingChangedListener = e => this.temporaryBook.rating = e.detail.rating;

    this.saved = false;

    // initialises editingShelves property to false to hide the shelf select control
    this.editingShelves = false;

    // sets the validation controller in a view-model field
    this.validationController = validationController;

    // adds the BootstrapFormRenderer to the validation controller
    this.validationController.addRenderer(new BootstrapFormRenderer());
  }

  bind() {
    // resets the book value to the temporary value to undo changes
    this.resetTempBook();

    // adds a listener on the rating element to handle changed events
    this.ratingElement.addEventListener("change", this.ratingChangedListener);

    // sets selected shelves based on book-model values
    this.selectedShelves = this.shelves.filter(shelf => 
      this.temporaryBook?.shelves?.indexOf(shelf) !== -1
    );

    // sets selected genre based on book-model value
    this.selectedGenre = this.genres.find(g => g.id == this.book.genre);
  }

  attached() {
    this.bookSaveCompleteSubscription = this.eventAggregator.subscribe(
      `book-save-complete-${this.book.Id}`, 
      () => this.bookSaveComplete()
    );
  }

  // watches for the editMode change and reset the temporary book
  editModeChanged(editModeNew, editModeOld) {
    if (editModeNew) this.resetTempBook();
  }

  // subscribes to selected-genre change and updates the temporary book as needed
  selectedGenreChanged(newValue, oldValue) {
    if (!newValue) return;

    this.temporaryBook.genre = newValue.id;
  }

  // use a dirty check on the view-model properties and incorporate added fields
  @computedFrom(
    "temporaryBook.title", 
    "temporaryBook.description", 
    "temporaryBook.rating",
    "temporaryBook.ownACopy",
    "saved",
    "temporaryBook.shelves",
    "temporaryBook.timesRead"
  )
  get canSave() {
    let clean = this.temporaryBook.title == this.book.title &&
                this.temporaryBook.genre == this.book.genre &&
                this.temporaryBook.ownACopy == this.book.ownACopy &&
                this.temporaryBook.description == this.book.description &&
                this.temporaryBook.shelves == this.book.shelves;

    return !clean;
  }

  // reset the temporary book ready for the next edit
  resetTempBook() {
    this.temporaryBook = Object.assign({}, this.book);
  }

  // cancels the delegate method, reverts changes on the book and closes the edit form
  cancel() {
    this.temporaryBook = this.book;

    // undoes any rating changes on cancel
    this.starRatingViewModel.applyRating(this.temporaryBook.rating);
    
    this.toggleEditMode();
  }

  save() {
    this.validationController
      .validate()
      .then(result => {
        if (result.valid) {
          this.loading = true;
          this.publishBookSavedEvent();
        }
      })
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
  publishBookSavedEvent() {
    this.eventAggregator.publish("save-book", this.temporaryBook);
  }

  // toggles the edit mode to close the form when edits are complete
  toggleEditMode() {
    this.eventAggregator.publish("edit-mode-changed", !this.editMode);
  }

  // toggles edit mode on shelves to enable select control
  toggleEditShelves() {
    this.editingShelves = !this.editingShelves;
  }

  // untoggles edit mode on shelves to disable select control
  unToggleEditShelves() {
    this.temporaryBook.shelves = this.selectedShelves;
    this.editingShelves = !this.editingShelves;
  }

  detached() {
    // cleans up the Event Aggregator subscription
    this.bookSaveCompleteSubscription.dispose();

    // removes the change-event listener to clean up
    this.ratingElement.removeEventListener("change", this.ratingChangedListener);
  }
}

// defines a new custom validation rule and gives the validation rule a name
ValidationRules.customRule(
  "zeroOrPositiveInteger",

  // allows for null or undefined nubmers and verifies that the input value is and integer >= 0
  (value, obj) => value === null ||
                  value === undefined ||
                  (Number.isInteger(value)) ||
                  value >= 0,

  "Books can only be read 0 or more times."
);

ValidationRules
  .ensure(a => a.title).required()        // applies a required validation rule to the Book title property
  .ensure(a => a.timesRead)               // initiates validation rule for the timesRead property
  .required()                             // adds the required validation rule to the timesRead property
  .satisfiesRule("zeroOrPositiveInteger") // adds the required validation rule to the timesRead property
  .on(Book);                              // applies the validation rules to the Book class
