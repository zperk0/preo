
export default class manageInviteController {

  static get UID(){
    return "manageInviteController";
  }

  sendOrResend(){
    return this.invite.id ? this.invite.resend.bind(this.invite) : Preoday.Invite.create;
  }

  onSuccessForVenue(entity) {

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
        this.hasSaved = true;

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

  onSuccessForChannel(entity) {

    const {
      Spinner,
      Snack,
      LabelService,
      StateService,
      $timeout,
      $state,
    } = this;

    let venueIds = null;
    let groupIds = null;
    let channelId = null;
    if (entity) {
      venueIds = this.params.entities.venues ? this.params.entities.venues.filter(o => o.$selected == true).map(o => o.id) : null;
      groupIds = this.params.entities.venueGroups ? this.params.entities.venueGroups.filter(o => o.$selected == true).map(o => o.id) : null;
      channelId = this.params.entities.channel && this.params.entities.channel.$selected ? this.params.entities.channel.id : null;

      venueIds.length > 0 ? entity.venueIds = venueIds : null;
      groupIds.length > 0 ? entity.groupIds = groupIds : null;
      channelId ? entity.channelId = channelId : null;
    }

    this.onSuccessForVenue(entity);
  }

  onCancel() {

    const {
      $state
    } = this;

    $state.go('main.dashboard.manageUsers');
  }

  /* @ngInject */
  constructor($timeout, $state, $scope, Spinner, Snack, LabelService, StateService, invite, invites, entities) {
    "ngInject";

    this.$timeout = $timeout;
    this.$state = $state;

    this.Spinner = Spinner;
    this.Snack = Snack;
    this.LabelService = LabelService;
    this.StateService = StateService;
    this.hasSaved = false;

    this.originalInvite = angular.copy(invite);
    this.invite = invite;
    this.params = {
      entities: entities
    };

    if (StateService.isChannel) {
      this.params.entities.channel = StateService.channel;
      this.template = 'userInvite.channel';
      this.onSuccess = this.onSuccessForChannel.bind(this);
    } else {
      this.template = 'userInvite';
      this.onSuccess = this.onSuccessForVenue.bind(this);
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
