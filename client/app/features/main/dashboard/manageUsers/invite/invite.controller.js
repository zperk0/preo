
export default class manageInviteController {

  static get UID(){
    return "manageInviteController";
  }

  sendOrResend(){
    return this.invite.id ? this.invite.resend.bind(this.invite) : Preoday.Invite.create;
  }

  onSuccess(entity) {

    const {
      Spinner,
      Snack,
      LabelService,
      StateService,
      $timeout,
      $state,
    } = this;

    const LOADER_KEY = 'user-role-update';

    Spinner.show(LOADER_KEY);
    if (this.invite && entity && entity.name){

      this.invite = entity;

      this.sendOrResend()(this.invite).then((newInvite) => {

        this.invite.$deleted = false;

        $timeout(() => {
          angular.extend(this.invite, newInvite);
          angular.extend(this.originalInvite, newInvite);
          $state.go("main.dashboard.manageUsers");
          Spinner.hide(LOADER_KEY);
          Snack.show(LabelService.SNACK_USER_INVITE_SUCCESS);
        });
      }, (err) => {
        console.log('error on save user-role', err);
        Spinner.hide(LOADER_KEY);
        if (err && err.status === 409){
          Snack.showError(LabelService.SNACK_USER_INVITE_CONFLICT);
        } else {
          Snack.showError(LabelService.SNACK_USER_INVITE_ERROR);
        }
      }).catch((err) => {
        console.error('error on save user-role', err);
        Spinner.hide(LOADER_KEY);
        Snack.showError(LabelService.SNACK_USER_INVITE_ERROR);
      })
    }
  }

  onCancel() {

    const {
      $state
    } = this;

    $state.go('main.dashboard.manageUsers');
  }

  /* @ngInject */
  constructor($timeout, $state, $scope, Spinner, Snack, LabelService, StateService, invite, invites) {
    "ngInject";

    this.$timeout = $timeout;
    this.$state = $state;

    this.Spinner = Spinner;
    this.Snack = Snack;
    this.LabelService = LabelService;
    this.StateService = StateService;

    this.originalInvite = invite;
    this.invite = angular.copy(invite);

    $scope.$on('$destroy', () => {
      if (!this.invite.id) {
        // it's a new invite and wasn't saved. So, we need to remove the empty item from the list
        invites.splice(invites.indexOf(invite), 1);
      }
    });

  }
}
