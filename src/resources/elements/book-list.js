import { bindable, inject } from "aurelia-framework";
import { EventAggregator } from "aurelia-event-aggregator";

@inject(EventAggregator)
export class BookList {
  @bindable books;

  constructor(eventAggregator) {
    this.eventAggregator = eventAggregator;
  }

  removeBook(index) {
    // publishes a "book-removed" event any time the remove-book button is clicked
    this.eventAggregator.publish("book-removed", index);
  }

  /*
  old way implementing bookLocation

  bookLocation(isFirst, isLast) {
    if (isFirst) return "- first book";
    if (isLast) return "- last book";

    return "";
  }
  */
}
