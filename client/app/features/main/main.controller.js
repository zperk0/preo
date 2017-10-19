
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
    console.log("handle finish loading")
    this.loadPermissions();
  }

  loadPermissions(){
    console.log("MainController [loadPermissions] - loading permissions")
    this.StateService.loadPermissions()
      .then((permissions)=>{
        console.log("MainController [loadPermissions] - got permissions", permissions, permissions[this.Permissions.DASHBOARD]);
        if (!permissions[this.Permissions.DASHBOARD]){
          this.$state.go("main.account");
          this.hideSpinner();
        } else {
          this.$timeout(()=>{
            this.hideSpinner();
            if (this.$state.current.name === 'main.dashboard') {
              this.$state.go('main.dashboard.home');
            }
          })
        }
      }, ()=>{
        console.log("MainController [loadPermissions] - Error fetching permissions, redirecting to signin");
        this.hideSpinner();
        this.$state.go("auth.signin");
      })
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


  constructor($rootScope, $stateParams, $state, $timeout, Permissions, DialogService, ErrorService, LabelService, BroadcastEvents, UserService, StateService, UtilsService, Spinner) {
    "ngInject";
    this.StateService=StateService;
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
