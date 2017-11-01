
export default class manageUsersController {
  static get UID(){
    return "manageUsersController"
  }

  /* @ngInject */
  constructor(users, invites) {
    "ngInject";
    this.users = users;
    this.invites = invites;
  }
}
