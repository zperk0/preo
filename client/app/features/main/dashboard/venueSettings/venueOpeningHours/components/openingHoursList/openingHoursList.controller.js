export default class openingHoursListController {

  static get UID() {
    return "openingHoursListController"
  }

  addNew () {

  	this.openingHours.push({
  		venueId: this.VenueService.currentVenue.id,
  		open: null,
  		close: null,
      opening: 1,
      days: []
  	});
  }


  constructor($scope, VenueService) {
    "ngInject";

    this.$scope = $scope;
    this.VenueService = VenueService;

    if (!this.openingHours.length) {
      this.addNew();
    }

  }
}
