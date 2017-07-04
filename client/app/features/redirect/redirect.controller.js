
export default class redirectController {
  static get UID(){
    return "redirectController"
  }

  showSpinner() {
    this.Spinner.show('redirect');
  }

  hideSpinner() {
    this.Spinner.hide('redirect');
  }

  forceCloseDialog() {
    this.$mdDialog.hide();
  }

  redirect() {
    this.showSpinner();
    this.forceCloseDialog();

    this.$timeout(() => {
      this.hideSpinner();
      this.$state.go(this.destination);
      if (this.refresh) {
        window.location.reload();
      }
    }, this.timeout || 300);
  }
  
  /* @ngInject */
  constructor($state, $stateParams, $timeout, $mdDialog, Spinner) {
    "ngInject";

    this.$state = $state;
    this.$timeout = $timeout;
    this.$mdDialog = $mdDialog;
    this.Spinner = Spinner;
    
    this.destination = $stateParams.destination;
    this.timeout = $stateParams.timeout;
    this.refresh = $stateParams.refresh;

    this.redirect();
  }
}
