export default class userInviteController {
  static get UID(){
    return "userInviteController"
  }

  contextualMenuSuccess(entity){
    this.Spinner.show("user-role-update");
    if (this.user && entity && entity.name){
      this.user = entity;
      this.account.updateUserRole(this.user).then((newUser)=>{

        this.user.$deleted = false;
        this.user.$selected = false;

        this.$timeout(() => {
          angular.extend(this.user, newUser);
          this.contextualMenu.hide();
          this.Spinner.hide("user-role-update");
          this.Snack.show(this.LabelService.SNACK_USER_ROLE_UPDATE);
        });
      }, (err)=>{
        console.log('error on save tax-group', err);
        this.Spinner.hide("user-role-update");
        this.Snack.showError(this.LabelService.SNACK_USER_ROLE_UPDATE_ERROR);
      }). catch((err)=>{
        console.log('error on save tax-group', err);
        this.Spinner.hide("user-role-update");
        this.Snack.showError(this.LabelService.SNACK_USER_ROLE_UPDATE_ERROR);
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
          this.account.removeUser(this.user)
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
        doneButtonText: this.LabelService.UPDATE_ROLE_BUTTON
    });
  }

   /* @ngInject */
  constructor($q, $timeout, Spinner, Snack, contextualMenu, contextual, DialogService, LabelService, ErrorService, VenueService) {
    "ngInject";
    this.$q = $q;
    this.$timeout = $timeout;
    this.Spinner = Spinner;
    this.account = VenueService.account;
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
