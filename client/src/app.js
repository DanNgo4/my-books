import { PLATFORM } from "aurelia-pal";
import "bootstrap";

export class App {
  configureRouter(config, router) {
    this.router = router;

    config.title = "my-books";
    config.map([
      {
        route: ["", "home"],
        name: "home",
        moduleId: PLATFORM.moduleName("./index"),
        title: "Home",
        nav: true,
        settings: { icon: "home" }
      },

      {
        route: "books",
        name: "books",
        moduleId: PLATFORM.moduleName("./resources/elements/books"),
        title: "Books",
        nav: true,
        settings: { icon: "book" }
      },

      {
        route: "users",
        name: "users",
        moduleId: PLATFORM.moduleName("./resources/elements/users"),
        title: "Users",
        nav: true,
        settings: { icon: "users" }
      },

      {
        route: "users/:name/details",
        name: "user-detail",
        moduleId: PLATFORM.moduleName("./resources/elements/user-details"),
        title: "User details"
      }
    ]);
  }
}
