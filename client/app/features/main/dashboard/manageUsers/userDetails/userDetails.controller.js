
export default class usersDetailsController {

  static get UID(){
    return "usersDetailsController";
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
    this.user = entity;
    this.user.updateRoles(this.user.userRoles).then((newUser)=>{

      this.user.$deleted = false;
      this.hasSaved = true;

      $timeout(() => {
        angular.extend(this.user, newUser);
        angular.extend(this.originalUser, newUser);
        $state.go("main.dashboard.manageUsers");
        Spinner.hide(LOADER_KEY);
        Snack.show(LabelService.SNACK_USER_ROLE_UPDATE);
      });
    }, (err) => {
      console.log('error on save tax-group', err);
      Spinner.hide(LOADER_KEY);
      Snack.showError(LabelService.SNACK_USER_ROLE_UPDATE_ERROR);
    }).catch((err)=>{
      console.log('error on save tax-group', err);
      Spinner.hide(LOADER_KEY);
      Snack.showError(LabelService.SNACK_USER_ROLE_UPDATE_ERROR);
    })
  }

  onSuccessForVenue (entity) {

    const {
      userRole,
    } = this;

    if (!entity.name || !userRole.venueIds.length) {
      return;
    }

    this.onSuccess(entity);
  }

  onSuccessForChannel (entity) {
    const {
      DialogService,
      ErrorService,
      LabelService,
      userRole,
    } = this;

    if (!entity.name || (
              !userRole.venueIds.length &&
              !userRole.groupIds.length &&
              !userRole.channelId)) {

      DialogService.show(ErrorService.CHANNEL_ENTITIES_REQUIRED.title, ErrorService.CHANNEL_ENTITIES_REQUIRED.message, [{
        name: LabelService.CONFIRMATION
      }]);

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
  constructor($scope, $timeout, $state, $stateParams, Spinner, Snack, LabelService, StateService, ErrorService, DialogService, user, entities) {
    "ngInject";

    this.$timeout = $timeout;
    this.$state = $state;

    this.Spinner = Spinner;
    this.Snack = Snack;
    this.LabelService = LabelService;
    this.StateService = StateService;
    this.ErrorService = ErrorService;
    this.DialogService = DialogService;

    this.hasSaved = false;

    this.originalUser = user;
    this.user = angular.copy(user);
    this.user.userRoles = angular.copy(this.originalUser.userRoles);
    const rolesFiltered = this.user.userRoles.filter((ur) => {
      return ur.role === $stateParams.role;
    });
    this.userRole = rolesFiltered.length ? rolesFiltered[0] : null;

    console.log('UserDetails [constructor] - rolesFiltered', rolesFiltered);

    this.params = {
      entities: entities,
      userRole: this.userRole
    };

    if (StateService.isChannel) {
      this.params.entities.channel = StateService.channel;
      this.template = 'user.channel';
      this.onSuccessCallback = this.onSuccessForChannel.bind(this);
    } else {
      this.template = 'user';
      this.onSuccessCallback = this.onSuccessForVenue.bind(this);
    }


    $scope.$on('$destroy', () => {
      if (!this.hasSaved) {
        angular.extend(this.user, this.originalUser);
      }
    });
  }
}
