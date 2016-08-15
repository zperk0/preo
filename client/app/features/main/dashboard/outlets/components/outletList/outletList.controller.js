export default class outletListController {
  static get UID(){
    return "outletListController"
  }

  onOutletMoved($items, $partFrom, $partTo, $indexFrom, $indexTo){

    if (!this.svIsDropzone) {
      return;
    }


    this.Spinner.show("outlet-move");
    this.cardItemList.onSimpleSort(true).then((outletsUpdated)=>{

      outletsUpdated.forEach((item, index) => {
        this.outlets[index].position = item.position;
      });

      this.Snack.show('Outlet moved');
    }, ()=>{
      this.Snack.showError('Error moving outlet');
    }).then(()=>{
      this.Spinner.hide("outlet-move");
    })
  }

  showCreateOutlet(){

    let isCreating = this.outlets.filter(function (item) {

      return item.id === undefined;
    }).length;
    
    if (isCreating){
      console.log("Not showing outlet location new, already showing")
      return;
    }
    
    let outlet = {
      venueId: this.venueId,
      $selected:true,
    };

    this.outlets.push(outlet);
  }  

  createOutlet(newData){

    let deferred = this.$q.defer();

    if (this.outlets.length > 1) {
      newData.position = this.getNewOutletPosition();
    } else {
      newData.position = 0;
    }

    this.OutletService.save(newData)
        .then((outlet)=>{
          
          deferred.resolve(outlet);
      }, (err) => {
        console.log('fail outlet saved', err);
        deferred.reject(err);
      });

    return deferred.promise;
  }   

  deleteOutlet(outlet){

    this.Spinner.show("outlet-delete");
    outlet.delete()
      .then(()=>{
        this.Snack.show('Outlet deleted');

        return this.cardItemList.deleteItem(outlet);
      }).then(()=>{
        this.Spinner.hide("outlet-delete");
      }).catch((err)=>{
        this.Spinner.hide("outlet-delete");

        if (err && err instanceof Object && err.message.indexOf('outletLocation') !== -1) {
          this.Snack.showError('An outlet location is using this outlet. You need remove it before');
        } else {
          this.Snack.showError('Error deleting outlet');
        }
      })
  }


  getNewOutletPosition () {

    return Math.max.apply(Math, this.outlets.map(function(o){return o.position || 0;})) + 1000;
  } 

  getValidOutlets() {

    if (!this.svIsDropzone) {
      return this.outlets.filter((item) => {

        return item.id;
      });
    }

    return this.outlets;
  }

  /* @ngInject */
  constructor($timeout, $q, $stateParams, Spinner, OutletService, Snack) {
    "ngInject";
    this.Spinner = Spinner;
    this.Snack = Snack;
    this.$q = $q;
    this.$timeout = $timeout;
    this.OutletService = OutletService;

    this.venueId = $stateParams.venueId;
  }
}
