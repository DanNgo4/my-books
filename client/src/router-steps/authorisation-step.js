import { Redirect } from "aurelia-router";

// a new authorisation-pipeline step
export class AuthoriseStep {
  constructor(authService) {
    this.authService = authService;
  }

  run(navigationInstruction, next) {
    if (
      navigationInstruction
        .getAllInstructions()
        .some(i => i.config.settings.auth)  // checks whether the requested route is authenticated
    ) {
      // checks whether the user is logged in
      if (!this.authService.isLoggedIn()) { 
        // redirects unauthenticated users to the login page
        return next.cancel(new Redirect("login"));
      }
    }

    // continues to the next step in the pipeline if the user is authenticated
    return next();
  }
}
