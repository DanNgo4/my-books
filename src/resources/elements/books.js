import { inject, bindable, computedFrom, observable } from "aurelia-framework";
import { EventAggregator } from "aurelia-event-aggregator";

import { BookApi } from "../../services/book-api";

@inject (BookApi, EventAggregator)
export class Books {
  constructor (bookApi, eventAggregator) {
    this.bookTitle = "";
    this.books = [];
    this.bookApi = bookApi;
    this.eventAggregator = eventAggregator;
  }

  // hooks into the attached() component-lifecycle callback method
  attached() {
    // subscribes to the "book-removed" channel and handles to book-removed event
    this.bookRemovedSubscription = this.eventAggregator.subscribe(
      "book-removed", 
      bookIndex => this.removeBook(bookIndex)
    );
  }

  @computedFrom("bookTitle.length") // indicates that the getter wants to be notified when the bookTitle.length value changes
  get canAdd() {
    return this.bookTitle.length === 0;
  }

  // defines a hook/subscriber method by convention to be called whenever the value of bookTitle changes
  bookTitleChanged(newValue, oldValue) {
    console.log(`Book title changed, Old Value: ${oldValue}, New Value: ${newValue}`);
  }

  addBook() {
    this.books.push({ title : this.bookTitle });
    this.bookTitle = "";
  }

  removeBook(bookIndex) {
    this.books.splice(bookIndex, 1);  
  }

  bind() {
    this.bookApi.getBooks().then(savedBooks => 
      this.books = savedBooks
    );
  }

  // hooks into the detached component-lifecycle callback method
  detached() {
    // disposes of the "book-removed" channel subscription
    this.bookRemovedSubscription.dispose();
  }
}
