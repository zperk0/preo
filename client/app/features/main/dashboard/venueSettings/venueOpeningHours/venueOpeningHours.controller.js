
export default class venueOpeningHoursController {
  static get UID(){
    return "venueOpeningHoursController";
  }

  hasOpeningHours () {

    return this.openingHours && Object.keys(this.openingHours).length > 0;
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

    return groupedHours;
  }

  constructor(Spinner, VenueService) {
    "ngInject";

    this.VenueService = VenueService;
    this.Spinner = Spinner;

    Spinner.show('venue-opening-hours');

    this.loading = true;

    this.openingHours = {};
    this.allHours = [];

    VenueService.currentVenue.getHours()
      .then((hours) => {

        this.allHours = hours;
        this.openingHours = this.groupHoursByTime(this.filterOpeningHours(hours));
        this.deliveryHours = this.groupHoursByTime(this.filterDeliveryHours(hours));
        this.collectionHours = this.groupHoursByTime(this.filterCollectionHours(hours));

        this.collectionSameAsOpening = Object.keys(this.collectionHours).length === 0;
        this.deliverySameAsOpening = Object.keys(this.deliveryHours).length === 0;

        Spinner.hide('venue-opening-hours');
        this.loading = false;
      }, () => {

        Spinner.hide('venue-opening-hours');
        this.loading = false;
      });

    this.collectionSameAsOpening = true;
    this.deliverySameAsOpening = true;
  }
}
