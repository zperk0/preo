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
    const currentUser = this.UserService.getCurrent();
    if (this.user.id === currentUser.id) {
      return this.DialogService.show(this.ErrorService.DELETE_CURRENT_USER.title, this.ErrorService.DELETE_CURRENT_USER.message, [{
        name: this.gettextCatalog.getString('Got it')
      }]);
    }
    this.DialogService.delete(this.LabelService.TITLE_DELETE_USER, this.LabelService.CONTENT_DELETE_USER)
      .then(()=>{
          this.Spinner.show("user-role-delete");
          this.venue.removeUser(this.user)
            .then(()=>{
              this.cardItemList.onItemDeleted(this.user);
              if (this.onItemDeleted){
                this.onItemDeleted({item:this.user});
              }
              this.Snack.show(this.LabelService.SNACK_USER_DELETED);
              this.Spinner.hide("user-role-delete");
          }, (error)=>{
            this.Spinner.hide("user-role-delete")
            this.Snack.showError(this.LabelService.SNACK_USER_DELETED_ERROR);
          })
          .catch((err)=>{
            this.Spinner.hide("user-role-delete")
            this.Snack.showError(this.LabelService.SNACK_USER_DELETED_ERROR);
          });
      });
  }

   /* @ngInject */
  constructor($q, $stateParams, Spinner, Snack, DialogService, LabelService, ErrorService, StateService, UserService, gettextCatalog, UtilsService) {
    "ngInject";
    this.$q = $q;
    this.$stateParams = $stateParams;
    this.Spinner = Spinner;
    this.venue = StateService.venue;
    this.Snack = Snack;

    this.DialogService = DialogService;
    this.LabelService = LabelService;
    this.ErrorService = ErrorService;
    this.UserService = UserService;
    this.gettextCatalog = gettextCatalog;
    this.UtilsService = UtilsService;

    this.isChannel = StateService.isChannel;
    this.type = 'user';
  }
}
