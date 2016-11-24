
export default class venueOpeningHoursController {
  static get UID(){
    return "venueOpeningHoursController";
  }

  hasOpeningHours () {

    return this.openingHours && this.openingHours.length > 0;
  }

  hasServiceMethods () {

    return this.VenueService.currentVenue.isPickup() || this.VenueService.currentVenue.isDelivery();
  }

  hasCollectionService () {

    return this.VenueService.currentVenue.isPickup();
  }

  hasDeliveryService () {

    return this.VenueService.currentVenue.isDelivery();
  }

  filterOpeningHours (hours) {

    return hours.filter((hour) => {

      return hour.opening === 1;
    });
  }

  filterDeliveryHours (hours) {

    return hours.filter((hour) => {

      return hour.opening === 0 && hour.delivery === 1;
    });
  }

  filterCollectionHours (hours) {

    return hours.filter((hour) => {

      return hour.opening === 0 && hour.pickup === 1;
    });
  }

  groupHoursByTime (hours) {

    let groupedHours = {};

    for (let i = 0, len = hours.length; i < len; i++) {
      let hour = hours[i];
      let key = [hour.open, hour.close].join('-');

      if (!groupedHours[key]) {
        groupedHours[key] = angular.copy(hour);
        groupedHours[key].days = [];
      }

      groupedHours[key].days.push(hour.day);
    }

    let hoursResult = [];

    angular.forEach(groupedHours, (value) => {

      hoursResult.push(value);
    });

    return hoursResult;
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
  }

  updateHours () {

    console.log('update openingHours here');

    this.openingHoursForm.$setSubmitted();
    this.serviceHoursForm.$setSubmitted();

    if (this.openingHoursForm.$invalid || this.serviceHoursForm.$invalid) {
      this.isFormError = true;
      this.isError = false;
      this.isSaving = false;
      return;
    }

    this.buildHoursFormat();

    this.openingHoursForm.$setPristine();
    this.openingHoursForm.$setUntouched();

    this.isSaving = true;
    this.isFormError = false;
    this.isError = false;
    this.debounce(this.doUpdate.bind(this), 1000)()
  }

  doUpdate () {

    this.$timeout(()=>{
      this.isSaving = false;
      this.isError = false;
      this.isFormError = false;
    })
  }

  toggleServiceHours () {

    if (!this.collectionSameAsOpening || !this.deliverySameAsOpening) {
      if (this.openingHours.length === 1 && this.openingHoursForm.$invalid) {
        return this.showInvalidConfigurationDialog();
      }
    }

    this.updateHours();
  }

  showInvalidConfigurationDialog () {

    this.DialogService.show(this.ErrorService.INVALID_OPENING_HOURS_CONFIGURATION.title, this.ErrorService.INVALID_OPENING_HOURS_CONFIGURATION.message, [{
        name: this.gettextCatalog.getString('Got it')
      }]);
  }

  buildHoursFormat () {

    let hours = [];
console.log('opening hoursss ===', this.openingHours);
    this.openingHours.forEach((currentHour) => {

      let hour = {
        open: currentHour.open,
        close: currentHour.close,
        // pickup: currentHour.pickup,
        // delivery: currentHour.delivery,
        // opening: currentHour.opening,
      };

      if (currentHour.$open) {
        hour.open = moment(currentHour.$open).format("HH:mm:00.000");
        hour.close = moment(currentHour.$close).format("HH:mm:00.000");
      }

      currentHour.days.forEach((day) => {

        hours.push(angular.extend(angular.copy(hour), {
          day: day
        }));
      });
    });

    console.log('hours to send to api = == = ', hours);
  }

  constructor($timeout, Spinner, VenueService, DialogService, ErrorService) {
    "ngInject";

    this.$timeout = $timeout;
    this.Spinner = Spinner;
    this.VenueService = VenueService;
    this.DialogService = DialogService;
    this.ErrorService = ErrorService;

    Spinner.show('venue-opening-hours');

    this.loaded = false;

    this.openingHours = {};
    this.allHours = [];

    VenueService.currentVenue.getHours()
      .then((hours) => {

        this.allHours = hours;
        this.openingHours = this.groupHoursByTime(this.filterOpeningHours(hours));
        this.deliveryHours = this.groupHoursByTime(this.filterDeliveryHours(hours));
        this.collectionHours = this.groupHoursByTime(this.filterCollectionHours(hours));

        this.collectionSameAsOpening = this.collectionHours.length === 0;
        this.deliverySameAsOpening = this.deliveryHours.length === 0;

        Spinner.hide('venue-opening-hours');
        this.loaded = true;
      }, () => {

        Spinner.hide('venue-opening-hours');
        this.loaded = true;
      });

    this.collectionSameAsOpening = true;
    this.deliverySameAsOpening = true;
  }
}
