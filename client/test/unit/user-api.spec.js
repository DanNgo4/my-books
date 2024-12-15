import { TestHelper } from "./test-helper";
import TestData from "./test-data";

import { UserApi } from "../../src/services/user-api";

describe("The UserApi service", () => {
  let httpClient, sut;
  let countries = TestData.Countries;
  let users = TestData.Users;

  let testUsers = beforeEach(() => {
    // creates a spy to track calls to httpClient.fetch
    httpClient = jasmine.createSpyObj("HttpClient", ["fetch"]);
  
    // initialises the UserApi with the stubbed HttpClient
    sut = new UserApi(httpClient);
  });

  it("load a user's country", done => {
    // returns a stub value whenever the fetch method is called
    httpClient.fetch.and.returnValue(
      TestHelper.mockResponseAsync(countries)
    );

    sut
      .loadCountry("au")
      .then(result => expect(result).toEqual(countries[0])) // checks that when loadCountry is called with a country code, you return the first matching country
      .then(() => {
        expect(httpClient.fetch).toHaveBeenCalledWith("countries?code=au"); // checks that the UserApi calls fetch with the expected arguments
      })
      .then(done);
  });

  // checks that you return an empty country when there are no matches 
  it("loads an empty country as a fallback", done => {
    httpClient.fetch.and.returnValue(TestHelper.mockResponseAsync([]));

    sut
      .loadCountry()
      .then(result => expect(result).toEqual({ code: "", name: "" }))
      .then(() => {
        expect(httpClient.fetch).toHaveBeenCalledWith("countries?code=undefined");
      })
      .then(done);
  });

  // checks that you return all users by default from the getUsers method
  it("gets all users", done => {
    httpClient.fetch.and.returnValue(TestHelper.mockResponseAsync(users));

    sut
      .getUsers()
      .then(result => expect(result).toEqual(users))
      .then(() => {
        expect(httpClient.fetch).toHaveBeenCalledWith("users");
      })
      .then(done);
  })
});
