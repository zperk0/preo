
export default class venueServicesController {
  static get UID(){
    return "venueServicesController"
  }

  loadDeliveryZones(){
     this.$state.go("main.dashboard.venueSettings.venueDeliveryZones");
  }

  doUpdate(){
    console.log("doing update", this.venue, this.updates);
    let promises = []
    if (this.updates['venue']){
      promises.push(this.VenueService.updateVenue())
    }
    if (this.updates['settings']){
      promises.push(this.venue.settings.update())
    }
    if (!promises.length){
      promises.push(this.$q.resolve())
    }
    this.$q.all(promises).then((results)=>{
      this.updates['venue'] = false;
      this.updates['settings'] = false;
      angular.extend(this.venue,results[0]);
      angular.extend(this.venue.settings,results[1]);
      this.isSaving = false;
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
    console.log("debouncing update", which);
    if (which){
      this.updates[which] = true;
    }
    this.isSaving = true;
    this.debounce(this.doUpdate.bind(this), 1000)()
  }

  debounce(func, wait, immediate) {
    console.log("debouncing");
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        console.log("in later", immediate)
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      console.log("if call now", callNow);
      if (callNow) func.apply(context, args);
    };
  };

  updateVenue(){
      this.Spinner.show("venue-services-save");
      try {
        this.VenueService.updateVenue()
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
    this.venue = this.VenueService.currentVenue ;
    this.$timeout(()=>{
      console.log(this.venue);
      this.Spinner.hide("venue-details");
    })
  }



  /* @ngInject */
  constructor($q, Spinner, $state, Snack, ErrorService, LabelService, $timeout, VenueService) {
    "ngInject";
    this.updates = {
      venue:false,
      settings:false
    };
    this.isSaving = false;
    this.isError = false;
    this.Spinner = Spinner;
    this.$q = $q;
    this.Snack = Snack;
    this.$state = $state;
    this.ErrorService = ErrorService;
    this.VenueService = VenueService;
    this.LabelService = LabelService;
    this.isError = false;
    this.$timeout = $timeout;
    this.init();
  }
}
