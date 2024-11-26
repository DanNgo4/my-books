import { inject, bindable, computedFrom, observable } from "aurelia-framework";
import { EventAggregator } from "aurelia-event-aggregator";

import _ from "lodash";

import { BookApi } from "../../services/book-api";

@inject (BookApi, EventAggregator)
export class Books {
  constructor (bookApi, eventAggregator) {
    this.bookTitle = "";
    this.books = [];
    this.bookApi = bookApi;
    this.eventAggregator = eventAggregator;
  }

  bind() {
    this.loadBooks();
    this.loadGenres();
    this.loadShelves();
  }

  // hooks into the attached() component-lifecycle callback method
  attached() {
    this.subscribeToEvents();
  }

  @computedFrom("bookTitle.length") // indicates that the getter wants to be notified when the bookTitle.length value changes
  get canAdd() {
    return this.bookTitle.length === 0;
  }

  // defines a hook/subscriber method by convention to be called whenever the value of bookTitle changes
  bookTitleChanged(newValue, oldValue) {
    console.log(`Book title changed, Old Value: ${oldValue}, New Value: ${newValue}`);
  }

  loadBooks() {
    this.bookApi.getBooks().then(savedBooks => this.books = savedBooks);
  }

  loadGenres() {
    this.bookApi.getGenres().then(genres => this.genres = genres); 
  }

  loadShelves() {
    this.bookApi.getShelves().then(shelves => this.shelves = shelves);
  }

  subscribeToEvents() {
    // subscribes to the book-removed event to remove a book from the array
    this.bookRemovedSubscription = this.eventAggregator.subscribe(
      "book-removed",
      bookIndex => this.removeBook(bookIndex)
    );

    // subscribes to the save-book event to notify subscribers a book has been modified
    this.bookSavedSubscription = this.eventAggregator.subscribe(
      "save-book",
      book => this.bookSaved(book)
    );
  }

  addBook() {
    this.books.push({ 
      title: this.bookTitle, 
      shelves: [],
      genres: [] 
    });

    this.bookTitle = "";
  }

  removeBook(toRemove) {
    let bookIndex = _.findIndex(this.books, book => {
      return book.Id === toRemove.Id;
    });

    this.books.splice(bookIndex, 1);  
  }

  bookSaved(updatedBook) {
    let index = this.books.findIndex(book => book.Id == updatedBook.Id);

    Object.assign(this.books[index], updatedBook);

    // saves the book using the book API
    // publishes a save-book-complete event for a specific book
    this.bookApi.saveBook(updatedBook)
                .then((savedBook) => this.eventAggregator.publish(
                  `book-save-complete-${savedBook.Id}`
                ));
  }

  bind() {
    this.bookApi.getBooks().then(savedBooks => 
      this.books = savedBooks
    );
  }

  // hooks into the detached component-lifecycle callback method to clean up the Event Aggregator subscriptions
  detached() {
    this.bookRemovedSubscription.dispose();
    this.bookSavedSubscription.dispose();
  }
}
