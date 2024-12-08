import { PLATFORM } from "aurelia-pal";
import "bootstrap";

export class App {
  configureRouter(config, router) {
    this.router = router;

    config.title = "my-books";

    // creates the new preActivate pipeline step
    var step = {
      run: (navigationInstruction, next) => {   // defines the required run function implementing the logging behaviour
        console.log("pre-activate for module", navigationInstruction.config.moduleId);  // logs the current moduleId on pre-activate
        return next();  // returns callback function
      }
    };
    config.addPreActivateStep(step);  // adds the new pre-activate step to the pipeline

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
        settings: { icon: "home" },
        layoutViewModel: PLATFORM.moduleName("main-layout")
      },

      {
        route: "books",
        name: "books",
        moduleId: PLATFORM.moduleName("./resources/elements/books"),
        title: "Books",
        nav: true,
        settings: { icon: "book" },
        layoutViewModel: "main-layout"
      },

      {
        route: "users",
        name: "users",
        moduleId: PLATFORM.moduleName("./resources/elements/users"),
        title: "Users",
        nav: true,
        settings: { icon: "users" },
        layoutViewModel: "main-layout"
      },

      {
        route: "users/:name/details",
        name: "user-detail",
        moduleId: PLATFORM.moduleName("./resources/elements/user-details"),
        title: "User details",
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
