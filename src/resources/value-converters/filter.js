export class FilterValueConverter{
  // toView() function takes the array to filter and the searchTerm to filter by
  toView(array, searchTerm) {
    // array.filter() function used to filter out any books that don't match
    return array.filter((item) => {
      return searchTerm && 
             searchTerm.length > 0 ? this.itemMatches(searchTerm, item)
                                   : true;
    })
  }  

  itemMatches(searchTerm, value) {
    // matches against the book.title property
    let itemValue = value.title;

    if (!itemValue) return false;

    return itemValue.toUpperCase().indexOf(searchTerm.toUpperCase()) !== -1;
  }
}
