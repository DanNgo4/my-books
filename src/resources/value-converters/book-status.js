export class BookStatusValueConverter {
  // implements the toView(value) method to transform the value from the view-model
  toView(value) {
    // switch statement to get the corresponding icon for a given status string
    switch (value) {
      case "bad":
        return "fa-frown";
      case "good":
        return "fa-smile";
      case "ok":
        return "fa-meh";
    }
    return "";
  }
}
