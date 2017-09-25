
export default class accountController {
  static get UID(){
    return "accountController";
  }

  deleteAccount() {
    this.confirmDeleteAccount()
      .then(() => {
        this.Spinner.show('delete-account');
        return this.deleteAccountAndLogout();
      });
  }

  deleteAccountAndLogout() {
    return this.user.deleteAccount()
      .then(() => {
        this.Spinner.hide('delete-account');
        return this.UserService.signout();
      }, () => {
        this.Spinner.hide('delete-account');
        return this.showError();
      });
  }

  showError() {
    return this.DialogService.show(this.ErrorService.DELETE_ACCOUNT_ERROR.title, this.ErrorService.DELETE_ACCOUNT_ERROR.message, [{
      name: this.LabelService.CONFIRMATION
    }]);
  }

  confirmDeleteAccount() {
    return this.DialogService.delete(this.LabelService.TITLE_DELETE_ACCOUNT, this.LabelService.CONTENT_DELETE_ACCOUNT);
  }

  constructor(UserService, DialogService, LabelService, ErrorService, Spinner) {
    "ngInject";

    this.DialogService = DialogService;
    this.LabelService = LabelService;
    this.ErrorService = ErrorService;
    this.UserService = UserService;
    this.Spinner = Spinner;
    this.user = this.UserService.getCurrent();
  }
}
