import { HttpClient, json } from "aurelia-fetch-client";
import { inject } from "aurelia-framework";

@inject(HttpClient)
export class AuthService {
  constructor(http) {
    this.http = http;
  }

  logIn(userName, password) {
    return this.http
    .fetch("token", {
        method: "post",
        body: json({ name: userName, password: password })
      })
    .then(response => response.json())
    .then(tokenResult => {
      if (tokenResult.success) window.localStorage.setItem("token", tokenResult.token);
      return tokenResult;
    })
    .catch(error => {
      console.log("Error retrieving token");
    })
  }

  logOut() {
    window.localStorage.removeItem("token");
  }

  getToken() {
    return window.localStorage.getItem("token");
  }

  get tokenInterceptor() {
    // sets auth to the current this context
    let auth = this;

    return {
      // hooks into the FetchClient requests
      request(request) {
        let token = auth.getToken();
        if (token) {
          // appends the token as an authorise request header
          request.headers.append("authorization");
        }
      }
    }
  }
}
