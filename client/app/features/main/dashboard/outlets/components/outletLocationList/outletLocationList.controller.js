export default class outletLocationListController {
  static get UID(){
    return "outletLocationListController"
  }

  onOutletLocationMoved($items, $partFrom, $partTo, $indexFrom, $indexTo){

    this.Spinner.show("outlet-location-move");
    this.cardItemList.onSimpleSort(true).then((outletLocationsUpdated)=>{

      outletLocationsUpdated.forEach((item, index) => {
        this.outletLocations[index].position = item.position;
      });

      this.Snack.show(this.gettextCatalog.getString('Outlet location moved'));
    }, ()=>{
      this.Snack.showError(this.gettextCatalog.getString('Error moving outlet location'));
    }).then(()=>{
      this.Spinner.hide("outlet-location-move");
    })
  }

  createOutletLocation(newData){

    let deferred = this.$q.defer();

    this.Spinner.show("outlet-location-create");

    if (this.outletLocations.length > 1) {
      newData.position = this.getNewOutletLocationPosition();
    } else {
      newData.position = 0;
    }

    this.OutletLocationService.save(newData)
        .then((outletLocation)=>{

          this.Spinner.hide("outlet-location-create");
          
          deferred.resolve(outletLocation);
      }, (err) => {
        console.log('fail outlet location saved', err);
        this.Spinner.hide("outlet-location-create");
        deferred.reject(err);
      });

    return deferred.promise;
  } 

  showCreateOutletLocation(){

    let isCreating = this.outletLocations.filter(function (item) {

      return item.id === undefined;
    }).length;
    
    if (isCreating){
      console.log("Not showing outlet location new, already showing")
      return;
    }
    
    let outletLocation = new Preoday.OutletLocation({
      venueId: this.venueId,
      parent: this.outletLocationGroup.id,
      label: this.outletLocationGroup.label,
      path: this.outletLocationGroup.path,
      $selected:true,
    });
  }  

  deleteOutletLocation(outletLocation){

    this.Spinner.show("outlet-location-delete");
    outletLocation.delete()
      .then(()=>{
        this.Snack.show(this.gettextCatalog.getString('Outlet location deleted'));
      }).then(()=>{
        this.Spinner.hide("outlet-location-delete");
      }).catch(()=>{
        this.Snack.showError(this.gettextCatalog.getString('Error deleting outlet location'));
        this.Spinner.hide("outlet-location-delete");
      })
  }

  getPosition(outletLocation){
    return outletLocation.position || this.outletLocations ? this.outletLocations.filter((i)=>outletLocation.id===i.id)[0].position : 0;
  } 

  getNewOutletLocationPosition () {

    return Math.max.apply(Math, this.outletLocations.map(function(o){return o.position || 0;})) + 1000;
  } 

  /* @ngInject */
  constructor($timeout, $stateParams, $q, Spinner, Snack, OutletLocationService, gettextCatalog) {
    "ngInject";
    this.Spinner = Spinner;
    this.Snack = Snack;
    this.OutletLocationService = OutletLocationService;
    this.$q = $q;
    this.$timeout = $timeout;
    this.gettextCatalog = gettextCatalog;
    this.venueId = $stateParams.venueId;
  }
}
