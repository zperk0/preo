
export default class mainController {
  static get UID(){
    return "mainController";
  }

  showSpinner(){
    this.Spinner.show("main");
  }
  hideSpinner(){
    this.Spinner.hide("main");
  }

  handleError(err) {
    this.ErrorService.showError(err);
    this.hideSpinner();
  }

  handleFinishLoading() {
    const {$state, $timeout} = this;

    $timeout(() => {
      this.hideSpinner();
      if ($state.current.name === 'main.dashboard') {
        $state.go('main.dashboard.home');
      }
    });
  }

  logout() {

    this.UserService.signout()
      .then(success => {

        this.UserService.restore();
      }, error => {

        this.handleError(error);
      });
  }

  handle403() {

    this.DialogService.show(this.ErrorService.EXPIRED_SESSION.title, this.ErrorService.EXPIRED_SESSION.message, [{
      name: this.LabelService.CONFIRMATION
    }]).then(() => this.logout());
  }


  constructor($rootScope, $stateParams, $state, $timeout, Permissions, DialogService, ErrorService, LabelService, BroadcastEvents, UserService, PermissionService, UtilsService, Spinner) {
    "ngInject";
    this.PermissionService=PermissionService;
    this.DialogService = DialogService;
    this.ErrorService = ErrorService;
    this.LabelService = LabelService;
    this.UtilsService = UtilsService;
    this.UserService = UserService;
    this.$state = $state;
    this.Permissions = Permissions;
    this.$rootScope = $rootScope;
    this.Spinner = Spinner;
    this.$timeout = $timeout;
    this.BroadcastEvents = BroadcastEvents;

    this.handleFinishLoading();

    UtilsService.onMessage((e) => {
      switch (e.data) {
        case '__REQUEST_ERROR:403__':
          this.handle403();
          break;
      }
    });
  }
}
