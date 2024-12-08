import { HttpClient } from "aurelia-http-client";
import { inject } from "aurelia-framework";

@inject(HttpClient)
export class BookApiJSONP {
  constuctor(http) {
    this.http = http;

    this.baseUrl = "http://localhost:8333/api/";

    this.http.configure(config => {
      config.withBaseUrl(this.baseUrl);
    });
  }

  // makes an HTTP JSONP call specifying the URL and the callback
  getBooksJsonp() {
    return this.http
      .jsonp("booksjsonp", "callback")
      .then(responseMessage => {
        return responseMessage.response; // retrieves the response body
      })
      .then(books => {
        return books;
      });
  }
}
