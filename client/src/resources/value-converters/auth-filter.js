import { inject } from "aurelia-framework";

import { AuthService } from "../../services/auth-service";

@inject(AuthService)
export class AuthFilterValueConverter {
  constructor(authService) {
    this.authService = authService;
  }

  // takes the routes array as input
  toView(routes) {
    // checks whether the user is logged in using the auth service
    let isAuthenticated = this.authService.isLoggedIn();

    // checks whether the user is an admin using the auth service
    let isAdmin = isAuthenticated && this.authService.getUser().admin;

    // returns only routes the user has access to, checking route metadata against the auth status
    return routes.filter(r => r.settigns.auth === undefined ||
                                (r.settings.auth === isAuthenticated && 
                                   (!r.settings.admin || isAdmin))
    );
  }
}
