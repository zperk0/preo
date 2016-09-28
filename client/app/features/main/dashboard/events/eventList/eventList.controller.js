
export default class eventListViewController {
  static get UID(){
    return "eventListViewController"
  }
  
  hideSpinner() {

    this.Spinner.hide('events');
  }

  /* @ngInject */
  constructor($stateParams, Spinner, EventService, OutletLocationService) {
  	'ngInject';

    this.Spinner = Spinner;
  	this.loaded = false;

    this.Spinner.show('events');

    OutletLocationService.getOutletLocations();

    EventService.getEvents($stateParams.venueId)
    	.then((data)=>{

	      console.log('collection events data here', data);

	      this.data = data;   
	      this.loaded = true;

	      this.hideSpinner();
	    }, () => {

	      this.data = {
	        events: []
	      };
	      console.log('error events service');
	      this.loaded = true;

	      this.hideSpinner();
	    });
  }
}
