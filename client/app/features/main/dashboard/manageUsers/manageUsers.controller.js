
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

  onEditInvite(invite) {

    const {
      $state
    } = this;

    $state.go('main.dashboard.manageUsers.invite', {
      inviteId: invite.id
    });
  }

  onNewInvite() {

    const {
      $state
    } = this;

    $state.go('main.dashboard.manageUsers.newInvite');
  }

  /* @ngInject */
  constructor($state, users, invites) {
    "ngInject";

    this.$state = $state;

    this.users = users;
    this.invites = invites;
  }
}
