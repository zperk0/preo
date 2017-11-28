
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

  onInviteDeleted(invite) {
    this.invites.splice(this.invites.indexOf(invite), 1);
  }

  /* @ngInject */
  constructor($state, users, invites) {
    "ngInject";

    this.$state = $state;

    this.users = users;
    this.invites = invites;
  }
}
