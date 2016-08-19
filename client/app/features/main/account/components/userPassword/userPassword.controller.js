export default class userPasswordController {
  static get UID(){
    return "userPasswordController"
  }

  shouldShowForm() {
  	return this._showForm;
  }

  showForm() {

    this.data = {};
  	this._showForm = true;
  }

  cancel () {

  	this._showForm = false;

    this.userPasswordForm.$setPristine(true);
    this.userPasswordForm.$setUntouched(true);    
  }

  checkNewPassword () {

    if (!this.userPasswordForm.$submitted) {
      return;
    }

    if (this.data.confirmNewPassword 
        && this.data.newPassword
        && this.data.confirmNewPassword != this.data.newPassword) {

      this.userPasswordForm.confirmNewPassword.$error.doesntMatch = true;
    } else {
      delete this.userPasswordForm.confirmNewPassword.$error.doesntMatch;
    }    

    this.userPasswordForm.confirmNewPassword.$setValidity();
  }

  toggleShowPasswordInput(input) {

    input.$showPassword = !!!input.$showPassword;
  }

  submit () {

    if (this.userPasswordForm.$invalid) {
      return;
    }

    if (this.data.confirmNewPassword != this.data.newPassword) {
      this.userPasswordForm.confirmNewPassword.$error.doesntMatch = true;
      this.userPasswordForm.confirmNewPassword.$setValidity();
      return;
    } else {
      delete this.userPasswordForm.confirmNewPassword.$error.doesntMatch;
      this.userPasswordForm.confirmNewPassword.$setValidity();
    }

    this.Spinner.show('user-password');

    this.$timeout(() => {
      
      this.Spinner.hide('user-password');     
      this.cancel(); 

      this.Snack.show(this.gettextCatalog.getString('Your password has been changed'));
    }, 1500);
  }  

  /* @ngInject */
  constructor(Spinner, Snack, $timeout, gettextCatalog) {
  	'ngInject';
    
    this.Spinner = Spinner;
    this.Snack = Snack;
    this.$timeout = $timeout;
    this.gettextCatalog = gettextCatalog;

    this._showForm = false;
  }
}
