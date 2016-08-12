
export default class outletListViewController {
  static get UID(){
    return "outletListViewController"
  }
  
  
  constructor($stateParams, OutletService) {
  	"ngInject";

  	this.loaded = false;

    OutletService.getOutlets({
      venueId: $stateParams.venueId
    }).then((data)=>{

      console.log('outlet service data here', data);

      this.data = data;
      this.loaded = true;
    }, () => {
      console.log('error outlet service');
      this.loaded = true;
    })    	
  }
}
