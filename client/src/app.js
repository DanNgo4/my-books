import { PLATFORM } from "aurelia-pal";
import { inject } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";

import "bootstrap";

import { AuthService } from "./services/auth-service";

import { AuthoriseStep } from "./router-steps/authorisation-step";

@inject(AuthService, HttpClient)
export class App {
  constructor(authService, http) {
    this.authService = authService;

    const baseUrl = "http://localhost:8333/api/";

    http.configure(config => {
      config.withBaseUrl(baseUrl)
            .withInterceptor(this.authService.tokenInterceptor);
    });
  }

  configureRouter(config, router) {
    this.router = router;

    config.title = "my-books";

    // instantiates the authorisation routing step and adds it to the pipeline
    let step = new AuthoriseStep(this.authService);
    config.addAuthorizeStep(step);

    // function determining which 404 module to render based on the route at runtime
    var handleUnknownRoutes = (instruction) => {
      let path = instruction.fragment.toLowerCase();

      if (path.includes("admin")) return PLATFORM.moduleName("./resources/elements/admin-unknown-route.html");

      return PLATFORM.moduleName("./resources/elements/what-happened.html");
    }

    config.map([
      {
        route: ["", "home"],
        name: "home",
        moduleId: PLATFORM.moduleName("./index"),
        title: "Home",
        nav: true,
        settings: { icon: "home", auth: true }, // tags secured routes to inform the route step and nav-bar filter about which routes require authentication
        layoutViewModel: PLATFORM.moduleName("main-layout")
      },

      {
        route: "books",
        name: "books",
        moduleId: PLATFORM.moduleName("./resources/elements/books"),
        title: "Books",
        nav: true,
        settings: { icon: "book", auth: true },
        layoutViewModel: "main-layout"
      },

      {
        route: "users",
        name: "users",
        moduleId: PLATFORM.moduleName("./resources/elements/users"),
        title: "Users",
        nav: true,
        settings: { icon: "users", auth: true, admin: true }, // tags admin-only routes
        layoutViewModel: "main-layout"
      },

      {
        route: "users/:name/details",
        name: "user-detail",
        moduleId: PLATFORM.moduleName("./resources/elements/user-details"),
        title: "User details",
        settings: { auth: true, admin: true },
        layoutViewModel: "main-layout"
      },

      {
        route: "login",
        name: "login",
        moduleId: PLATFORM.moduleName("./resources/elements/login"),
        title: "login",
        layoutView: PLATFORM.moduleName("login-layout.html")   // the login routed component will be injected into the login layout, different to other components being injected to the main layout that has the navigation bar
      },

      // redirects the legacy-users route to the new /users URL fragment
      {
        route: "legacy-users",
        redirect: "users"
      }
    ]);

    // renders the appropriate template based on the kind of unknown route
    config.mapUnknownRoutes(handleUnknownRoutes);
  }
}
