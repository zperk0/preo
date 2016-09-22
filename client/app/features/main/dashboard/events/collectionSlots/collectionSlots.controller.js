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

      // this.data = data;
    this.data = {
    	collectionSlots: [{
        id: 1,
    		name: 'Test'
    	}, {
        id: 2,
        name: 'Test 2'
      }, {
        id: 3,
    		name: 'Test 43'
    	}]
    };      
      this.loaded = true;

      this.hideSpinner();
    }, () => {
      console.log('error collection slot service');
      this.loaded = true;

      this.hideSpinner();
    })
  }
}
