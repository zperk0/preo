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
    }, 1500);
  }

  /* @ngInject */
  constructor($timeout, Spinner) {
  	'ngInject';

    this.$timeout = $timeout;
    this.Spinner = Spinner;
    
    this._showForm = false;
  }
}
