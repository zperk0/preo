
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
    console.log("setting venue", $event, venueId);
    this.VenueService.fetchById(venueId)
      .then(this.handleFinishLoading.bind(this), this.handleError.bind(this,"VENUE_NOT_FOUND"))
      .catch(this.handleError.bind(this));
  }

  handleError(err){
    console.log("handle error");
    this.ErrorService.showError(err);
    this.hideSpinner();
  }
  handleFinishLoading(){
    console.log("handle finished");
    this.hideSpinner();

  }


  constructor($rootScope, $stateParams, ErrorService, BroadcastEvents, UserService, VenueService, Spinner) {
    "ngInject";
    this.VenueService=VenueService;
    this.ErrorService = ErrorService;
    this.$rootScope = $rootScope;
    this.Spinner = Spinner;
    this.BroadcastEvents = BroadcastEvents;
    $rootScope.$on(BroadcastEvents._PREO_DO_VENUE_SELECT,this.setVenue.bind(this));
    if (UserService.isAuth){
      VenueService.fetchById($stateParams.venueId).then((venue)=>{
        this.setVenue(null,venue)
      })
    }

  }
}
