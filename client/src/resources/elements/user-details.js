import { bindable, inject } from "aurelia-framework";
import { UserApi } from "../../services/user-api";

@inject(UserApi)
export class UserDetails {
  constructor(userApi) {
    this.userApi = userApi;
  }

  // loads a user by the name specified in the route params argument during the activate callback
  activate(params, routeConfig) {
    this.loadUser(params.name);
  }

  loadUser(name) {
    this.userApi.getUser(name).then(fetchedUser => {
      this.user = fetchedUser;

      // loads the user's country by country code
      this.userApi
        .loadCountry(this.user.country)
        .then(country => {
          this.selected = country.code ? {
            "name": country.name,
            "code": country.code
          } : {
            "name": "Australia",
            "code": "AU"
          };
        });
    });
  }

  // assigns the user's country code based on the currently selected value
  countryChanged(evt) {
    this.user.country = evt.target.value;
  }

  saveUser() {
    this.userApi.saveUser(this.user).then(savedUser => {
      alert("Successfully saved user");
    });
  }
}
