
export default class venueOpeningHoursController {
  static get UID(){
    return "venueOpeningHoursController";
  }

  hasOpeningHours () {

    return this.allHours && this.allHours.length > 0;
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

    return () => {
      var context = this, args = arguments;
      var later = function() {
        context.timeoutDebounce = null;
        console.log("in later", immediate)
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !context.timeoutDebounce;
      clearTimeout(context.timeoutDebounce);
      context.timeoutDebounce = setTimeout(later, wait);
      console.log("if call now", callNow);
      if (callNow) func.apply(context, args);
    };
  }

  hasAnHourWithoutDay (collection) {

    return collection.filter((item) => {

      return item.days.length === 0;
    }).length > 0;
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

    if (this.hasAnHourWithoutDay(this.openingHours)) {
      return;
    }

    if (!this.collectionSameAsOpening && this.hasAnHourWithoutDay(this.collectionHours)) {
      return;
    }

    if (!this.deliverySameAsOpening && this.hasAnHourWithoutDay(this.deliveryHours)) {
      return;
    }


    this.openingHoursForm.$setPristine();
    this.openingHoursForm.$setUntouched();

    this.isSaving = true;
    this.isFormError = false;
    this.isError = false;
    this.debounce(this.doUpdate.bind(this), 1500)()
  }

  doUpdate () {

    let hoursToSave = this.buildHoursFormat();

    this.HoursService.save(hoursToSave)
      .then((hours) => {

        this.allHours = this.filterOpeningHours(hours);

        this.$timeout(() => {
          this.isSaving = false;
          this.isError = false;
          this.isFormError = false;
        });
      }, () => {

        this.$timeout(() => {
          this.isSaving = false;
          this.isError = true;
          this.isFormError = false;
        });
      }).catch(() => {

        this.$timeout(() => {
          this.isSaving = false;
          this.isError = true;
          this.isFormError = false;
        });
      });
  }

  toggleServiceHours () {

    if (this.collectionSameAsOpening) {
      this.collectionHours = [];
    }

    if (this.deliverySameAsOpening) {
      this.deliveryHours = [];
    }

    this.$timeout(() => {

      this.updateHours();
    });
  }

  buildHoursFormat () {

    let hours = [];

    hours = hours.concat(this.buildHours(this.openingHours, {
      pickup: this.collectionSameAsOpening ? 1 : 0,
      delivery: this.deliverySameAsOpening ? 1 : 0,
      opening: 1,
    }));

    if (!this.collectionSameAsOpening) {
      hours = hours.concat(this.buildHours(this.collectionHours, {
        pickup: 1,
        delivery: 0,
        opening: 0,
      }));
    }

    if (!this.deliverySameAsOpening) {
      hours = hours.concat(this.buildHours(this.deliveryHours, {
        pickup: 0,
        delivery: 1,
        opening: 0,
      }));
    }

    return hours;
  }

  buildHours (collection, dataToMerge) {

    let hours = [];

    collection.forEach((currentHour) => {

      let hour = angular.extend({
        open: currentHour.open,
        close: currentHour.close
      }, dataToMerge);

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

    return hours;
  }

  constructor($timeout, Spinner, VenueService, DialogService, ErrorService, HoursService, gettextCatalog) {
    "ngInject";

    this.$timeout = $timeout;
    this.Spinner = Spinner;
    this.VenueService = VenueService;
    this.HoursService = HoursService;
    this.gettextCatalog = gettextCatalog;

    Spinner.show('venue-opening-hours');

    this.loaded = false;

    this.timeoutDebounce = null;

    this.openingHours = {};
    this.allHours = [];

    VenueService.currentVenue.getHours()
      .then((hours) => {

        this.allHours = hours;
        this.openingHours = this.groupHoursByTime(this.filterOpeningHours(hours));
        this.deliveryHours = this.groupHoursByTime(this.filterDeliveryHours(hours));
        this.collectionHours = this.groupHoursByTime(this.filterCollectionHours(hours));

        this.collectionSameAsOpening = this.hasCollectionService () && this.collectionHours.length === 0;
        this.deliverySameAsOpening = this.hasDeliveryService() && this.deliveryHours.length === 0;

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
