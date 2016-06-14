
export default class mainController {
  static get UID(){
    return "mainController";
  }

  setVenue(venueId){
    this.VenueService.fetchById(venueId)
      .then(this.handleFinishLoading.bind(this), this.handleError.bind(this,"VENUE_NOT_FOUND"))
      .catch(this.handleError.bind(this));
  }

  handleError(err){
    this.ErrorService.showError(err);
  }
  handleFinishLoading(){
    this.$rootScope.$on(this.BroadcastEvents._PREO_ON_VENUE_SELECTED,this.setVenue);
    console.log("loaded main");
  }

  /* @ngInject */
  constructor($rootScope, $stateParams, ErrorService, BroadcastEvents, UserService, VenueService) {
    'ngInject';
    this.VenueService=VenueService;
    this.ErrorService = ErrorService;
    this.$rootScope = $rootScope;
    this.BroadcastEvents = BroadcastEvents;
    this.setVenue(Number($stateParams.venueId));
    $rootScope.$on(BroadcastEvents._PREO_DO_VENUE_SELECT,this.setVenue);
  }
}
