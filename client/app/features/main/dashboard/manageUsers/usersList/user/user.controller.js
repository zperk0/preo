export default class userController {
  static get UID(){
    return "userController"
  }

  isSelected() {
    return this.user && +this.user.id === +this.$stateParams.userId &&
           this.userRole && this.userRole.role === this.$stateParams.role;
  }

  getDisplayName() {

    const {
      user,
      userRole,
      isChannel,
      UtilsService
    } = this;

    const displayName = [user.firstName];
    if (user.lastName) {
      displayName.push(user.lastName);
    }

    if (isChannel) {
      displayName.push('- ' + UtilsService.getRoleAsString(userRole.role));
    }

    return displayName.join(' ');
  }

  onDelete(){

    const {
      DialogService,
      ErrorService,
      LabelService,
      gettextCatalog,
      Spinner,
      Snack,
      UserService,
      StateService,
    } = this;

    const currentUser = UserService.getCurrent();
    if (this.user.id === currentUser.id) {
      return DialogService.show(ErrorService.DELETE_CURRENT_USER.title, ErrorService.DELETE_CURRENT_USER.message, [{
        name: gettextCatalog.getString('Got it')
      }]);
    }

    const LOADER_KEY = 'user-role-delete';

    DialogService.delete(LabelService.TITLE_DELETE_USER, LabelService.CONTENT_DELETE_USER)
      .then(()=>{
        Spinner.show(LOADER_KEY);
        StateService.removeUser(this.user, this.userRole)
          .then((user)=>{
            if (this.onItemDeleted) {
              this.onItemDeleted({user: this.user, userRole: this.userRole});
            }
            Snack.show(LabelService.SNACK_USER_DELETED);
            Spinner.hide(LOADER_KEY);
        }, (error) => {
          console.log('UserController [onDelete] - error', error);
          Spinner.hide(LOADER_KEY)
          Snack.showError(LabelService.SNACK_USER_DELETED_ERROR);
        })
        .catch((err) => {
          console.log('UserController [onDelete] - catch', err);
          Spinner.hide(LOADER_KEY)
          Snack.showError(LabelService.SNACK_USER_DELETED_ERROR);
        });
      });
  }

   /* @ngInject */
  constructor($q, $stateParams, Spinner, Snack, DialogService, LabelService, ErrorService, StateService, UserService, gettextCatalog, UtilsService) {
    "ngInject";
    this.$q = $q;
    this.$stateParams = $stateParams;
    this.Spinner = Spinner;
    this.DialogService = DialogService;
    this.LabelService = LabelService;
    this.ErrorService = ErrorService;
    this.UserService = UserService;
    this.gettextCatalog = gettextCatalog;
    this.UtilsService = UtilsService;
    this.StateService = StateService;
    this.Snack = Snack;

    this.isChannel = StateService.isChannel;
    this.type = 'user';
  }
}
