
export default class accountController {
  static get UID(){
    return "accountController";
  }

  deleteAccount() {
    this.confirmDeleteAccount()
      .then(() => {
        return this.deleteAccountAndLogout();
      }, () => {
        return this.showError();
      });
  }

  deleteAccountAndLogout() {
    return this.user.deleteAccount()
      .then(() => {
        return this.UserService.signout();
      }, () => {
        return this.showError();
      });
  }

  showError() {
    return this.DialogService.showError(this.DELETE_ACCOUNT_ERROR.message);
  }

  confirmDeleteAccount() {
    return this.DialogService.delete(this.LabelService.TITLE_DELETE_ACCOUNT, this.LabelService.CONTENT_DELETE_ACCOUNT);
  }

  constructor(UserService, DialogService, LabelService, ErrorService) {
    "ngInject";

    this.DialogService = DialogService;
    this.LabelService = LabelService;
    this.ErrorService = ErrorService;
    this.UserService = UserService;
    this.user = this.UserService.getCurrent();
  }
}
