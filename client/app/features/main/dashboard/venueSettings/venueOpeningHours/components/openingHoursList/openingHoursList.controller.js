export default class openingHoursListController {

  static get UID() {
    return "openingHoursListController"
  }

  addNew () {

  	this.openingHours.push({
  		venueId: this.StateService.venue.id,
  		open: null,
  		close: null,
      opening: 1,
      days: []
  	});
  }

  onUpdateHour () {

    this.update();
  }

  onDelete (openingHour) {

    this.openingHours.splice(this.openingHours.indexOf(openingHour), 1);

    this.$timeout(() => {

      this.update();
    });
  }

  update() {

    this.onUpdate && this.onUpdate();
  }

  constructor($scope, $timeout, StateService) {
    "ngInject";

    this.$scope = $scope;
    this.$timeout = $timeout;
    this.StateService = StateService;

    if (!this.openingHours.length) {
      this.addNew();
    }

  }
}
