import { inject } from "aurelia-framework";
import { AuthService } from "../../services/auth-service";
import { Router } from "aurelia-router";

@inject(Router, AuthService)
export class NavBar {
  constructor(router, authService) {
    this.authService = authService;
    this.router = router;
  }

  bind() {
    // hooks into the bind component life-cycle callback and sets the current user for display
    this.user = this.authService.getUser();
  }

  // logs the user out, clearing their token and redirecting them to the login page
  logOut() {
    this.authService.logOut();
    this.router.navigateToRoute("login");
  }
}
