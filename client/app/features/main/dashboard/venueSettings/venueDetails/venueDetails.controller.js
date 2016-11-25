
export default class venueDetailsController {
  static get UID(){
    return "venueDetailsController"
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

  debounceUpdate(isAddress){
    this.venueDetailsForm.$setSubmitted();
    this.isSaving = true;
    if (this.venueDetailsForm.$valid){
      if (isAddress){
        this.updateAddress().then(()=>{
          this.debounce(this.doUpdate.bind(this), 1000)()
        })
      } else{
        this.debounce(this.doUpdate.bind(this), 1000)()
      }
    } else {
      this.$timeout(()=>{ //in a timeout to prevent super fast results
        this.isSaving = false;
        this.isError = true;
      }, 500)
    }
  }

  updateAddress(){
     return this.MapsService.getGeoLocationByAddress(this.venue)
      .then((location)=>{
        this.venue.latitude = location.lat();
        this.venue.longitude = location.lng();
        console.log("got location");
      },()=>{
        console.log("error getting location");
        //if the user put a crazy address that google can't find, just leave it blank and it'll be handled in the location page afterwards
      })
  }

  doUpdate(){

      try {
        delete this.venue.ccySymbol;
        this.venue.update()
        .then((venue)=>{
          // angular.extend(this.venue,venue);
          angular.extend(this.VenueService.currentVenue, venue)
          return this.venue.settings.update()
        })
        .then((settings)=>{
            // angular.extend(this.venue.settings,settings);
            angular.extend(this.VenueService.currentVenue.settings, settings)
            this.$timeout(()=>{
              this.isSaving = false;
              this.isError = false;
            })
          }, (err)=>{
            console.error(err)
            this.$timeout(()=>{
              this.isSaving = false;
              this.isError = true;
            })
          }).catch((err)=>{
            console.error(err)
            this.$timeout(()=>{
              this.isSaving = false;
              this.isError = true;
            })
          })
      } catch(e){
        console.error(e)
        this.$timeout(()=>{
          this.isSaving = false;
          this.isError = true;
        })
      }
  }

  init(){
    this.Spinner.show("venue-details");
    this.venue = angular.copy(this.VenueService.currentVenue);
    this.$timeout(()=>{
      console.log(this.venue);
      this.Spinner.hide("venue-details");
    })
  }

  /* @ngInject */
  constructor(Spinner, Snack, MapsService, ErrorService, LabelService, $timeout, VenueService) {
    "ngInject";
    this.Spinner = Spinner;
    this.Snack = Snack;
    this.ErrorService = ErrorService;
    this.MapsService = MapsService;
    this.VenueService = VenueService;
    this.LabelService = LabelService;
    this.isError = false;
    this.isSaving = false;
    this.$timeout = $timeout;
    this.debounceTimeout = null;
    this.init();
  }
}
