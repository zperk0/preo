export default class collectionSlotsController {
  static get UID(){
    return "collectionSlotsController"
  }

  hideSpinner() {

    this.Spinner.hide('collectionSlots');
  }


  constructor($stateParams, Spinner, CollectionSlotsService) {
  	"ngInject";

    this.Spinner = Spinner;
  	this.loaded = false;

    this.Spinner.show('collectionSlots');

    CollectionSlotsService.getCollectionSlots({
      venueId: $stateParams.venueId
    }).then((data)=>{

      console.log('collection slot service data here', data);

      this.data = data;   
      this.loaded = true;

      this.hideSpinner();
    }, () => {

      this.data = {
        collectionSlots: []
      };
      console.log('error collection slot service');
      this.loaded = true;

      this.hideSpinner();
    })
  }
}
