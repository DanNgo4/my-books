import TestData from "./test-data";

import { FilterValueConverter } from "../../src/resources/value-converters/filter";

describe("the filter value converter", () => {
  // system under test
  let sut;

  // initialises a new value-converter instance for each spec
  beforeEach(() => {
    sut = new FilterValueConverter();
  });

  it("should filter a list of books", () => {
    const books = [TestData.Books.WarAndPeace, TestData.Books.Oliver];

    const expectedResult = [TestData.Books.Oliver];

    // executes the toView method to apply the filter
    const result = sut.toView(books, "Ol");

    // checks the results are filtered correctly
    expect(result).toEqual(expectedResult);
  });
})
