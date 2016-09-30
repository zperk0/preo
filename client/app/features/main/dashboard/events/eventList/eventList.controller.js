
export default class eventListViewController {
  static get UID(){
    return "eventListViewController"
  }
  
  hideSpinner() {

    this.Spinner.hide('events');
  }

  /* @ngInject */
  constructor($q, Spinner, EventService, VenueService, OutletLocationService) {
  	'ngInject';

    this.Spinner = Spinner;
  	this.loaded = false;

    this.Spinner.show('events');

    $q.all([
        EventService.getEvents(VenueService.currentVenue.id),
        OutletLocationService.getOutletLocations()
      ]).then((results) => {

        this.data = results[0];

        this.loaded = true;
        this.hideSpinner();
      }, (err) => {

        this.data = {
          events: []
        };
        console.log('error events service');
        this.loaded = true;

        this.hideSpinner();
      });
  }
}
