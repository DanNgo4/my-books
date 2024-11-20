export class SearchBoldValueConverter {
  // takes the searchTerm converter parameter
  toView(value, searchTerm) {
    if (!searchTerm) return value;

    // applies the bold highlight
    return value.replace(new RegExp(searchTerm, "gi"), `<b>$&</b>`);
  }
}
