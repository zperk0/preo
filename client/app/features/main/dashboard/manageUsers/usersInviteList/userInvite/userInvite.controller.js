export default class userInviteController {
  static get UID(){
    return "userInviteController"
  }

  sendOrResend(){
    return this.user.id ? this.user.resend.bind(this.user) : Preoday.Invite.create;
  }

  contextualMenuSuccess(entity){
    this.Spinner.show("user-role-update");
    if (this.user && entity && entity.name){

      this.user = entity;

      this.sendOrResend()(this.user).then((newInvite)=>{

        this.user.$deleted = false;
        this.user.$selected = false;

        this.$timeout(() => {
          angular.extend(this.user, newInvite);
          this.contextualMenu.hide();
          this.Spinner.hide("user-role-update");
          this.Snack.show(this.LabelService.SNACK_USER_INVITE_SUCCESS);
        });
      }, (err)=>{
        console.log('error on save user-role', err);
        this.Spinner.hide("user-role-update");
        if (err && err.status === 409){
          this.Snack.showError(this.LabelService.SNACK_USER_INVITE_CONFLICT);
        } else {
          this.Snack.showError(this.LabelService.SNACK_USER_INVITE_ERROR);
        }
      }). catch((err)=>{
        console.error('error on save user-role', err);
        this.Spinner.hide("user-role-update");
        this.Snack.showError(this.LabelService.SNACK_USER_INVITE_ERROR);
      })
    }
  }


  onEdit ($event) {

    this.originalUser  = angular.copy(this.user);
    this.cardItemList.selectItem(this.user);
    this.showContextual();
    $event.stopPropagation();
  }

  onDelete(){
    this.DialogService.delete(this.LabelService.TITLE_DELETE_USER, this.LabelService.CONTENT_DELETE_USER)
      .then(()=>{
          this.Spinner.show("user-role-delete");
          this.user.remove()
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

  restoreOriginalValues() {
    if (this.originalUser){
      angular.extend(this.user, this.originalUser);
      this.originalUser = false;
    }
  }

  contextualMenuCancel() {

    this.restoreOriginalValues();
    this.user.$selected = false;

    if (this.user && !this.user.id) {
      this.cardItemList.deleteItem(this.user);
    }
  }

  showContextual () {
    this.contextual.showMenu(this.type, this.user, this.contextualMenuSuccess.bind(this), this.contextualMenuCancel.bind(this), {
        doneButtonText: this.user.id ? this.LabelService.RESEND_INVITE_BUTTON : this.LabelService.SEND_INVITE_BUTTON
    });
  }

   /* @ngInject */
  constructor($q, $timeout, Spinner, Snack, contextualMenu, contextual, DialogService, LabelService, ErrorService, StateService) {
    "ngInject";
    this.$q = $q;
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
     if (this.user && !this.user.id) {
      this.showContextual();
    }

  }
}
