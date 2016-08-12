export default class outletListController {
  static get UID(){
    return "outletListController"
  }

  onOutletMoved($items, $partFrom, $partTo, $indexFrom, $indexTo){

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
    
    let outlet = new Preoday.Outlet({
      venueId: this.venueId,
      $selected:true,
    });

    this.outlets.push(outlet);
  }  

  createOutletLocation(newData){

    let deferred = this.$q.defer();

    this.Spinner.show("outlet-create");

    if (this.outlets.length > 1) {
      newData.position = this.getNewOutletPosition();
    } else {
      newData.position = 0;
    }

    this.OutletService.save(newData)
        .then((outlet)=>{

          this.Spinner.hide("outlet-create");
          
          deferred.resolve(outlet);
      }, (err) => {
        console.log('fail outlet saved', err);
        this.Spinner.hide("outlet-create");
        deferred.reject(err);
      });

    return deferred.promise;
  }   

  getNewOutletPosition () {

    return Math.max.apply(Math, this.outlets.map(function(o){return o.position || 0;})) + 1000;
  } 

  /* @ngInject */
  constructor($timeout, $q, Spinner, OutletService, Snack) {
    "ngInject";
    this.Spinner = Spinner;
    this.Snack = Snack;
    this.$q = $q;
    this.$timeout = $timeout;
    this.OutletService = OutletService;

    this.showCreateOutlet();
  }
}
