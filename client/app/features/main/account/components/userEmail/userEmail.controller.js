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

    let user = this.UserService.getCurrent();

    user.changeEmail({
      email: this.data.email,
      password: this.data.password
    }).then(() => {

      if (user.username === user.email) {
        this.Snack.show(this.gettextCatalog.getString('Your new username is') + ' ' + this.data.email);
      } else {
        this.Snack.show(this.gettextCatalog.getString('Your email has been changed'));
      }

      // this.Snack.show(this.gettextCatalog.getString('An activation link has been sent to {{email}}', {
      //   email: this.data.email
      // }));
      this.UserService.signout();
      this.cancel();
    }, (error) => {

      this.Spinner.hide('user-email');

      if (error && error instanceof Object) {
        if (error.status === 401) {
          return this.Snack.showError(this.gettextCatalog.getString('Sorry, the password you entered was incorrect. Please try again!'));
        } else if (error.status === 409) {
          return this.Snack.showError(this.gettextCatalog.getString('This email is already in use, please use another'));
        }
      }

      this.Snack.showError(this.gettextCatalog.getString('An error ocurred to change your email, try again later'));
    });
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
