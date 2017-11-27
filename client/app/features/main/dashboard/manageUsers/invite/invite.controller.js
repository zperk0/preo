
export default class manageInviteController {

  static get UID(){
    return "manageInviteController";
  }

  sendOrResend() {

    if (!this.invite.id) {
      return Preoday.Invite.create;
    }

    if (this.StateService.isChannel) {
      return this.invite.update.bind(this.invite);
    }

    return this.invite.resend.bind(this.invite);
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

    this.invite = entity;
    this.sendOrResend()(this.invite).then((newInvite) => {

      this.invite.$deleted = false;
      this.hasSaved = true;

      $timeout(() => {
        angular.extend(this.invite, newInvite);
        angular.extend(this.originalInvite, newInvite);
        $state.go("main.dashboard.manageUsers");
        Spinner.hide(LOADER_KEY);
        Snack.show(LabelService.SNACK_USER_INVITE_SUCCESS);
      });
    }, (err) => {
      console.log('InviteController [onSuccess] - error on save invite', err);
      Spinner.hide(LOADER_KEY);
      if (err && err.status === 409 && err.errorCode === this.APIErrorCode.INVITE_USER_EXISTS) {
        Snack.showError(LabelService.SNACK_USER_INVITE_CONFLICT);
      } else {
        Snack.showError(LabelService.SNACK_USER_INVITE_ERROR);
      }
    }).catch((err) => {
      console.error('InviteController [onSuccess] - error on save invite', err);
      Spinner.hide(LOADER_KEY);
      Snack.showError(LabelService.SNACK_USER_INVITE_ERROR);
    });
  }

  onSuccessForVenue(entity) {

    if (!entity.name || !entity.invites.venueIds.length) {
      return;
    }

    this.onSuccess(entity);
  }

  onSuccessForChannel(entity) {

    if (!entity.name || (
              !entity.invites.venueIds.length &&
              !entity.invites.groupIds.length &&
              !entity.invites.channelId)) {
      return;
    }

    this.onSuccess(entity);
  }

  onCancel() {

    const {
      $state
    } = this;

    $state.go('main.dashboard.manageUsers');
  }

  /* @ngInject */
  constructor($timeout, $state, $scope, Spinner, Snack, LabelService, StateService, APIErrorCode, invite, invites, entities) {
    "ngInject";

    this.$timeout = $timeout;
    this.$state = $state;

    this.Spinner = Spinner;
    this.Snack = Snack;
    this.LabelService = LabelService;
    this.StateService = StateService;
    this.APIErrorCode = APIErrorCode;

    this.hasSaved = false;

    this.originalInvite = angular.copy(invite);
    this.invite = invite;
    this.params = {
      entities: entities
    };

    if (StateService.isChannel) {
      this.params.entities.channel = StateService.channel;
      this.template = 'userInvite.channel';
      this.onSuccessCallback = this.onSuccessForChannel.bind(this);
    } else {
      this.template = 'userInvite';
      this.onSuccessCallback = this.onSuccessForVenue.bind(this);
    }

    $scope.$on('$destroy', () => {
      if (!this.hasSaved) {
        if (!this.invite.id) {
          // it's a new invite and wasn't saved. So, we need to remove the empty item from the list
          invites.splice(invites.indexOf(invite), 1);
        } else {
          angular.extend(this.invite, this.originalInvite);
        }
      }
    });

  }
}
