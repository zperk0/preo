export default class userEmailController {
  static get UID(){
    return "userEmailController"
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

  	this.userEmailForm.$setPristine(true);
  	this.userEmailForm.$setUntouched(true);
  }

  submit () {

    if (this.userEmailForm.$invalid) {
      return;
    }

    this.Spinner.show('user-email');

    this.$timeout(() => {
      
      this.Spinner.hide('user-email');     
      this.cancel(); 

      this.Snack.show(this.gettextCatalog.getString('An activation link has been sent to {{email}}', {
        email: this.data.email
      }));
    }, 1500);
  }

  getEmail () {

    return this.UserService.user && this.UserService.user.email;
  }

  /* @ngInject */
  constructor($timeout, Spinner, Snack, gettextCatalog, UserService) {
  	'ngInject';

    this.$timeout = $timeout;
    this.Spinner = Spinner;
    this.Snack = Snack;
    this.gettextCatalog = gettextCatalog;
    this.UserService = UserService;

    this._showForm = false;
  }
}
