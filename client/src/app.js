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
        moduleId: PLATFORM.moduleName("./index")
      },

      {
        route: "books",
        name: "books",
        moduleId: PLATFORM.moduleName("./resources/elements/books")
      }
    ]);
  }
}
