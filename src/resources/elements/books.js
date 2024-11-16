import { inject, bindable, computedFrom, observable } from "aurelia-framework";
import { BookApi } from "../../services/book-api";

@inject (BookApi)
export class Books {
  @observable bookTitle = ""; // extracts bookTitle to be defined outside of the constructor and marks it as @observable

  constructor (bookApi) {
    this.bookTitle = "";
    this.books = [];
    this.bookApi = bookApi;
  }

  @computedFrom("bookTitle.length") // indicates that the getter wants to be notified when the bookTitle.length value changes
  get canAdd() {
    return this.bookTitle.length === 0;
  }

  // defines a hook/subscriber method to be called whenever the value of bookTitle changes
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
