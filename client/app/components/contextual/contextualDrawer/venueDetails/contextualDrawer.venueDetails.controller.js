export default class contextualDrawerOutletsController {
  static get UID(){
    return "ContextualDrawerVenueDetails";
  }

  close(){
    this.$mdSidenav('outlets').close()
      .then(function () {
        console.log("close Modifiers is done");
      });

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
        this.debounce(this.doUpdate.bind(this), 1000)()
    } else {
      this.$timeout(()=>{ //in a timeout to prevent super fast results
        this.isSaving = false;
        this.isError = true;
      }, 500)
    }
  }

  doUpdate(){

      try {
      //  delete this.venue.ccySymbol;
       // this.venue.update()
       this.VenueService.updateVenue()
        .then((venue)=>{

          // angular.extend(this.venue,venue);
           angular.extend(this.VenueService.currentVenue, venue);

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

  onVenueMapImageChange (image) {

    if (image) {
      image.type = this.VenueImageType.VENUE_MAP;
      this.VenueService.saveImage(image)
        .then((response) => {

          angular.extend(response, image);
          response.$save = false;

          this.venueMapImages.splice(this.venueMapImages.indexOf(image), 1, response);
        }, () => {

        });
    }
  }

  onVenueMapImageDeleted (image) {

    if (image) {
      image.delete()
        .then(() => {

          this.$timeout(() => {

            this.venueMapImages.splice(this.venueMapImages.indexOf(image), 1);
          });
        }, () => {

        });
    }
  }


  init(){
    this.Spinner.show("venue-details");
    this.venue = this.VenueService.currentVenue;

    this.venueMapImages = [];

    if (this.venue.images) {
      this.venueMapImages = this.venue.images.filter((image) => {

        return image.type === this.VenueImageType.VENUE_MAP;
      });

      console.log('venue map images here', this.venueMapImages);
    }

    // if (this.venue.isEvent()) {

    // }

    this.$timeout(()=>{
      console.log(this.venue);
      this.Spinner.hide("venue-details");
    })

  }

  constructor($scope, $stateParams, $mdSidenav, Spinner, Snack, MapsService, ErrorService, LabelService, $timeout, VenueService, VenueImageType) {
    "ngInject";
    this.$mdSidenav = $mdSidenav;
    this.cancelledOutlets = [];
    this.Spinner = Spinner;
    this.Snack = Snack;
    this.ErrorService = ErrorService;
    this.MapsService = MapsService;
    this.VenueService = VenueService;
    this.LabelService = LabelService;
    this.$timeout = $timeout;
    this.VenueImageType = VenueImageType;

    this.isError = false;
    this.isSaving = false;
    this.debounceTimeout = null;

    this.init();
  }
}
