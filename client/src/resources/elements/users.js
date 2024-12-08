import { bindable, inject } from "aurelia-framework";
import { UserApi } from "../../services/user-api";

@inject(UserApi)
export class Users {
  constructor(userApi) {
    this.userApi = userApi;
  }

  bind() {
    this.loadUsers();
  }

  // saves the users on the view-model once the promise returns so they're available for binding 
  loadUsers() {
    this.userApi.getUsers().then(users => {
      this.users = users;
    })
  }
}
