import { inject } from "aurelia-framework";
import { Router } from "aurelia-router";

import { AuthService } from "../../services/auth-service";

@inject(Router, AuthService)
export class Login {
  constructor(router, authService) {
    this.router = router;
    this.authService = authService;
  }

  logIn() {
    this.authService
      .logIn(this.userName, this.password)
      .then(tokenResult => {
        if (tokenResult.success) {
          this.errorMessage = "";
          this.router.navigateToRoute("home");
        } else {
          this.errorMessage = tokenResult.message;
        }
      })
  }
}
