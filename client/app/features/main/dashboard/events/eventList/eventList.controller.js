
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

    let oneDay = 24 * 60 * 60 * 1000,
        date = new Date(),
        interval = 7,
        firstDate = new Date(date.getTime() - (oneDay * interval)),
        filter = {'after' : firstDate.getFullYear() + '/' + (firstDate.getMonth() + 1) + '/' + firstDate.getDate() };

    $q.all([
        EventService.getEvents(VenueService.currentVenue.id, filter),
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
