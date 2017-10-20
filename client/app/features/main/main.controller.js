
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
  setVenue($event, venueId){
    console.log("setting venue",venueId)
    this.VenueService.fetchById(venueId)
      .then(this.handleFinishLoading.bind(this), this.handleError.bind(this,"VENUE_NOT_FOUND"))
      .catch(this.handleError.bind(this));
  }

  handleError(err){
    this.ErrorService.showError(err);
    this.hideSpinner();
  }
  handleFinishLoading(){

    const {
      PermissionService,
      $state,
      $timeout,
    } = this;

    if (!PermissionService.hasPermission(PermissionService.Permissions.DASHBOARD)) {
      $state.go("main.account");
      this.hideSpinner();
    } else {
      $timeout(()=>{
        this.hideSpinner();
        if ($state.current.name === 'main.dashboard') {
          $state.go('main.dashboard.home');
        }
      })
    }
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
    // this.showSpinner();

    // $rootScope.$on(BroadcastEvents._PREO_DO_VENUE_SELECT,this.setVenue.bind(this));
    // if (UserService.isAuth()){

      // if (Number($stateParams.entityId) > 0) {
      //   VenueService.fetchById($stateParams.entityId).then((venue)=>{
      //     this.setVenue(null,venue.id)
      //   }, this.handleError.bind(this,"VENUE_NOT_FOUND"));
      // } else {
      //   VenueService.selectVenue();
      //   this.handleFinishLoading();
      // }
    // }

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
