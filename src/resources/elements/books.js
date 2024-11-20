import { inject, bindable, computedFrom, observable } from "aurelia-framework";
import { BindingSignaler } from "aurelia-templating-resources";

import { BookApi } from "../../services/book-api";

// injects the BookApi and BindingSignaler class from the Aurelia DI container, which then will take an instance of each class singleton
@inject (BookApi, BindingSignaler)
export class Books {
  @observable bookTitle = ""; // extracts bookTitle to be defined outside of the constructor and marks it as @observable

  constructor (bookApi, bindingSignaler) {
    this.bookTitle = "";
    this.books = [];
    this.bookApi = bookApi;

    // alternative implementation with signal binding behaviour (bindingSignaler)
    this.bindingSignaler = bindingSignaler;
  }

  canAdd() {
    return this.bookTitle.length === 0;
  }

  refreshSignal() {
    // fires a 'can-add-signal' event whenever the refreshSignal method is called
    this.bindingSignaler.signal('can-add-signal');
  }

  /* @computedFrom("bookTitle.length") // indicates that the getter wants to be notified when the bookTitle.length value changes
  get canAdd() {
    return this.bookTitle.length === 0;
  } */

  // defines a hook/subscriber method by convention to be called whenever the value of bookTitle changes
  bookTitleChanged(newValue, oldValue) {
    console.log(`Book title changed, Old Value: ${oldValue}, New Value: ${newValue}`);
  }

  addBook() {
    this.books.push({ title : this.bookTitle });
    this.bookTitle = "";
  }

  bind() {
    this.bookApi.getBooks().then(savedBooks => 
      this.books = savedBooks
    );
  }
}
