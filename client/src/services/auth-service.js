import { HttpClient, json } from "aurelia-fetch-client";
import { inject } from "aurelia-framework";

@inject(HttpClient)
export class AuthService {
  constructor(http) {
    this.http = http;
  }

  // checks if the user is logged in based on the presence of the token
  isLoggedIn() {
    let token = this.getToken();

    if (token) return true;

    return false
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
      console.log("Error retrieving token", error);
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

  // gets the user from the token
  getUser() {
    let token = this.decodeToken();
    return token._doc;
  }

  // decodes the JWT so that you can extract the user with Base64 decode
  decodeToken(token) {
    token = token || this.getToken();

    if (!token) return;

    try {
      return JSON.parse(atob(token.split(",")[1]));
    } catch (e) {
      return null;
    }
  }
}
