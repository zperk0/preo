
export default class venueServicesController {
  static get UID(){
    return "venueServicesController"
  }

  loadDeliveryZones(){
     this.$state.go("main.dashboard.venueSettings.venueDeliveryZones");
  }

  doUpdate(){
    var promises = [];
    this.setDefaultLeadTime();
    promises.push(this.StateService.updateVenue())
    promises.push(this.venue.settings.update())
    this.$q.all(promises).then((results)=>{
      angular.extend(this.venue,results[0]);
      angular.extend(this.venue.settings,results[1]);
      this.isSaving = false;
      this.isError = false;
      console.log("saved all promises");
    },()=>{
      this.isSaving = false;
      this.isError = true;
      console.log("error saving all promises");
    }).catch((err)=>{
      console.error(err);
      console.log("exception saving all promises");
      this.isSaving = false;
      this.isError = true;
    })
  }

  debounceUpdate(which){
    if (this.collectionForm.$valid){
      console.log("debouncing update", which);
      this.isSaving = true;
      this.debounce(this.doUpdate.bind(this), 1000)()
    }
  }

  debounce(func, wait, immediate) {
    console.log("debouncing");
    return () => {
      var context = this, args = arguments;
      var later = function() {
        context.debounceTimeout = null;
        console.log("in later", immediate)
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !context.debounceTimeout;
      clearTimeout(context.debounceTimeout);
      context.debounceTimeout = setTimeout(later, wait);
      console.log("if call now", callNow);
      if (callNow) func.apply(context, args);
    };
  };

  updateVenue(){
      this.Spinner.show("venue-services-save");
      try {
        this.StateService.updateVenue()
        .then((venue)=>{
          angular.extend(this.venue,venue);
            this.Spinner.hide("venue-services-save");
            this.Snack.show(this.LabelService.SNACK_VENUE_SERVICES_SUCCESS)
          }, (err)=>{
            console.error("venue-services" ,err);
            this.Spinner.hide("venue-services-save");
            this.Snack.showError(this.LabelService.SNACK_VENUE_SERVICES_ERROR)
          }).catch((err)=>{
            console.error("venue-services err",err)
            this.Spinner.hide("venue-services-save");
            this.Snack.showError(this.LabelService.SNACK_VENUE_SERVICES_ERROR)
            })
      } catch(e){
        console.error(e)
        this.Spinner.hide("venue-services-save");
        this.Snack.showError(this.LabelService.SNACK_VENUE_SERVICES_ERROR)
      }
  }

   updateVenueSettings(){

      if (!this.collectionForm.$valid) {
        return;
      }

      this.Spinner.show("venue-services-save");
      try {
        this.venue.settings.update()
        .then((settings)=>{
          angular.extend(this.venue.settings,settings);
            this.Spinner.hide("venue-services-save");
            this.Snack.show(this.LabelService.SNACK_VENUE_SERVICES_SUCCESS)
          }, (err)=>{
            console.error("venue-services" ,err);
            this.Spinner.hide("venue-services-save");
            this.Snack.showError(this.LabelService.SNACK_VENUE_SERVICES_ERROR)
          }).catch((err)=>{
            console.error("venue-services err",err)
            this.Spinner.hide("venue-services-save");
            this.Snack.showError(this.LabelService.SNACK_VENUE_SERVICES_ERROR)
            })
      } catch(e){
        console.error(e)
        this.Spinner.hide("venue-services-save");
        this.Snack.showError(this.LabelService.SNACK_VENUE_SERVICES_ERROR)
      }
  }

  init(){
    this.Spinner.show("venue-details");
    this.venue = this.StateService.venue;
    this.$timeout(()=>{
      console.log(this.venue);

      if (this.hasDeliveryZoneFeature || this.venue.isEvent()) {
        this.Spinner.hide("venue-details");
      }
    })
  }

  setDefaultLeadTime() {
    if (this.venue.settings) {
      if (!this.venue.settings.leadTime) {
        this.venue.settings.leadTime = 0;
      }
      if (!this.venue.settings.deliveryLeadTime) {
        this.venue.settings.deliveryLeadTime = 0;
      }
    }
  }

  /* @ngInject */
  constructor($q, Spinner, $state, Snack, ErrorService, FeatureService, LabelService, $timeout, StateService) {
    "ngInject";
    this.isSaving = false;
    this.isError = false;
    this.Spinner = Spinner;
    this.$q = $q;
    this.Snack = Snack;
    this.$state = $state;
    this.ErrorService = ErrorService;
    this.StateService = StateService;
    this.LabelService = LabelService;
    this.$timeout = $timeout;
    this.hasDeliveryZoneFeature = FeatureService.hasDeliveryZoneFeature()
    this.debounceTimeout = null;
    this.init();
  }
}
