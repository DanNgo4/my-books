import { computedFrom, bindable } from "aurelia-framework";

export class BookStats {
  @bindable books;  // bound (binded) from the parent view
  @bindable originalNumberOfBooks;  // bound (binded) from the parent view

  @computedFrom("originalNumberOfBooks", "books.length")
  get addedBooks() {
    return this.books.length - this.originalNumberOfBooks;
  }
}
