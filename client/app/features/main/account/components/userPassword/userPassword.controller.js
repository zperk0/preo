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

    console.log(input);
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
    }, 1500);
  }  

  /* @ngInject */
  constructor(Spinner, $timeout) {
  	'ngInject';
    
    this.Spinner = Spinner;
    this.$timeout = $timeout;

    this._showForm = false;
  }
}
