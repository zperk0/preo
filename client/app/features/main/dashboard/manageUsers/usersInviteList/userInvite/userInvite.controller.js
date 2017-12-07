export default class userInviteController {
  static get UID(){
    return "userInviteController"
  }

  isSelected() {
    return this.user &&
           (+this.user.id === +this.$stateParams.inviteId) ||
           (!this.user.id && !this.$stateParams.inviteId); // new invite
  }

  onDelete(){
    this.DialogService.delete(this.LabelService.TITLE_DELETE_USER, this.LabelService.CONTENT_DELETE_USER)
      .then(()=>{
          this.Spinner.show("user-role-delete");
          this.user.remove()
            .then(()=>{
              if (this.onItemDeleted) {
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
  constructor($q, $stateParams, $timeout, Spinner, Snack, contextualMenu, contextual, DialogService, LabelService, ErrorService, StateService) {
    "ngInject";
    this.$q = $q;
    this.$stateParams = $stateParams;
    this.$timeout = $timeout;
    this.Spinner = Spinner;
    this.venue = StateService.venue;
    this.Snack = Snack;
    this.contextualMenu = contextualMenu;
    this.contextual = contextual;
    this.DialogService = DialogService;
    this.LabelService = LabelService;
    this.ErrorService = ErrorService;

    this.type = 'userInvite';
    //  if (this.user && !this.user.id) {
    //   this.showContextual();
    // }
  }
}
