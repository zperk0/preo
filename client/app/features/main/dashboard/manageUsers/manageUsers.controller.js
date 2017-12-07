
export default class manageUsersController {
  static get UID(){
    return "manageUsersController"
  }

  onEditUser(user, userRole) {
    console.log('manageUsersController [onEditUser] - userRole', userRole);

    const {
      $state
    } = this;

    $state.go('main.dashboard.manageUsers.detail', {
      userId: user.id,
      role: userRole.role
    });
  }

  onUserDeleted(user, userRole) {
    if (user.userRoles.length < 2) {
      this.users.splice(this.users.indexOf(user), 1);
    } else {
      user.userRoles.splice(user.userRoles.indexOf(userRole), 1);
    }
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
  constructor($state, $scope, users, invites) {
    "ngInject";

    this.$state = $state;
    this.$scope = $scope;

    this.users = users;
    this.invites = invites;

    this.disabledSticky = true;

    const onViewContentLoaded = $scope.$on('$viewContentLoaded', (event, viewName) => {
      if (viewName.indexOf('userDetailView') === 0) {
        // we have an animation in our main-ui-view and we need to wait it to finish to start the sticky
        // If we start the sticky before the animation finish, the sticky will calculate a wrong width for our contextual
        this.disabledSticky = false;
      }
    });

    $scope.$on('$destroy', () => {
      onViewContentLoaded && onViewContentLoaded();
    });
  }
}
