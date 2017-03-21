
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
    console.log("loading permissions")
    this.VenueService.getPermissions()
      .then((permissions)=>{
        console.log("got permissions", permissions, permissions[this.Permissions.DASHBOARD]);
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
        console.log("Error fetching permissions, redirecting to signin");
        this.hideSpinner();
        this.$state.go("auth.signin");
      })
  }


  constructor($rootScope, $stateParams, $state, $timeout, Permissions,  ErrorService, BroadcastEvents, UserService, VenueService, Spinner) {
    "ngInject";
    this.VenueService=VenueService;
    this.ErrorService = ErrorService;
    this.$state = $state;
    this.Permissions = Permissions;
    this.$rootScope = $rootScope;
    this.Spinner = Spinner;
    this.$timeout = $timeout;
    this.BroadcastEvents = BroadcastEvents;
    this.showSpinner();

    $rootScope.$on(BroadcastEvents._PREO_DO_VENUE_SELECT,this.setVenue.bind(this));
    if (UserService.isAuth()){

      if (Number($stateParams.venueId) > 0) {
        VenueService.fetchById($stateParams.venueId).then((venue)=>{
          this.setVenue(null,venue.id)
        }, this.handleError.bind(this,"VENUE_NOT_FOUND"));
      } else {
        VenueService.selectVenue();
        this.handleFinishLoading();
      }
    }
  }
}
