import { HttpClient, json } from "aurelia-fetch-client";
import { inject } from "aurelia-framework";

@inject (HttpClient)
export class BookApi {
  constructor(http) {
    this.http = http;

    const baseUrl  = "http://localhost:8333/api/";

    http.configure(config => {
      config
        .withBaseUrl(baseUrl)
        .withInterceptor({  // adds an interceptor to the http client configuration
          request(request) {
            // custom header for POST requests
            if (request.method == "POST") {
              request.headers["awesome-custom-header"];
            }

            console.log("request", request);
            return request;
          },
          response(response) {
            console.log("response", response);
            return response;
          }
        });
    });
  }

  getBooks() {
    return this.http.fetch("books")
      .then(response => response.json())
      .then(books => {
        return books;
      })
      .catch(error => {
        console.log.apply("Error retrieving books");
        return [];
      })
  }

  // retrieves a preset list of book shelves
  getShelves() {
    return this.http.fetch("shelves")
      .then(response => response.json())
      .then(shelves => {
        return shelves;
      })
      .catch(error => {
        console.log("Error retrieving shelves");
        return [];
      })
  }

  // retrieves a preset list of genres
  getGenres() {
    return this.http.fetch("genres")
      .then(response => response.json())
      .then(genres => {
        return genres;
      })
      .catch(error => {
        console.log("Error retrieving genres.");
        return [];
      });
  }

  addBook(book) {
    return this.http.fetch("books", {
      method: "post",
      body: json(book)
    }).then(response => response.json())
      .then(createdBook => {
        return createdBook;
      })
      .catch(error => {
        console.log("Error adding book.");
      })
  }

  deleteBook(book) {
    return this.http.fetch(`book/${book._id}`, {
      method: "delete"
    }).then(response => response.json())
      .then(responseMessage => {
        return responseMessage;
      })
      .catch(error => {
        console.log("Error deleting book");
      });
  }

  saveBook(book) {
    return this.http.fetch(`book/${book._id}`, {
      method: "put",
      body: json(book)
    }).then(response => response.json())
      .then(savedBook => {
        return savedBook;
      })
      .catch(error => {
        console.log("Error saving book.");
      })
  }

  // latency simulation refactored into its own method
  simulateFetch(fetchResult) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(fetchResult);
      }, this.simulatedLatency);
    });
  }
}
