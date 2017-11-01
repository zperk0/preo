
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
    if (this.user && entity && entity.name){
      this.user = entity;
      StateService.venue.updateUserRole(this.user).then((newUser)=>{

        this.user.$deleted = false;

        $timeout(() => {
          angular.extend(this.user, newUser);
          angular.extend(this.originalUser, newUser);
          $state.go("main.dashboard.manageUsers");
          Spinner.hide(LOADER_KEY);
          Snack.show(LabelService.SNACK_USER_ROLE_UPDATE);
        });
      }, (err)=>{
        console.log('error on save tax-group', err);
        Spinner.hide(LOADER_KEY);
        Snack.showError(LabelService.SNACK_USER_ROLE_UPDATE_ERROR);
      }). catch((err)=>{
        console.log('error on save tax-group', err);
        Spinner.hide(LOADER_KEY);
        Snack.showError(LabelService.SNACK_USER_ROLE_UPDATE_ERROR);
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
  constructor($timeout, $state, Spinner, Snack, LabelService, StateService, user) {
    "ngInject";

    this.$timeout = $timeout;
    this.$state = $state;

    this.Spinner = Spinner;
    this.Snack = Snack;
    this.LabelService = LabelService;
    this.StateService = StateService;

    this.originalUser = user;
    this.user = angular.copy(user);

  }
}
