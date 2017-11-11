
export default class outletListViewController {
  static get UID(){
    return "outletListViewController"
  }

  hideSpinner() {

    this.Spinner.hide('outlets');
  }


  constructor($stateParams, Spinner, OutletService, StateService) {
  	"ngInject";

    this.Spinner = Spinner;
  	this.loaded = false;

    this.Spinner.show('outlets');

    OutletService.getOutlets({
      venueId: StateService.venue.id
    }).then((data)=>{

      console.log('outlet service data here', data);

      this.data = data;
      this.loaded = true;

      this.hideSpinner();
    }, () => {
      console.log('error outlet service');
      this.loaded = true;

      this.hideSpinner();
    })
  }
}
