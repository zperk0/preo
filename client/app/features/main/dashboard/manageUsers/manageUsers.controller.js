
export default class manageUsersController {
  static get UID(){
    return "manageUsersController"
  }

  onEditUser(user) {

    const {
      $state
    } = this;

    $state.go('main.dashboard.manageUsers.detail', {
      userId: user.id
    });
  }

  /* @ngInject */
  constructor($state, users, invites) {
    "ngInject";

    this.$state = $state;

    this.users = users;
    this.invites = invites;
  }
}
