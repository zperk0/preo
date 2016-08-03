export default class outletLocationListController {
  static get UID(){
    return "outletLocationListController"
  }

  onOutletLocationMoved($items, $partFrom, $partTo, $indexFrom, $indexTo){
    
    // rerorder outletLocation list. Just it
    console.log($items, $partFrom, $partTo, $indexFrom, $indexTo);


    // this.Spinner.show("section-move");
    // console.log("on section moved, updating");
    // this.cardItemList.onSimpleSort().then(()=>{
    //   this.Snack.show('Section moved');
    // }, ()=>{
    //   this.Snack.showError('Error moving section');
    // }).then(()=>{
    //   this.Spinner.hide("section-move");
    // })
  }

  createOutletLocation(newData){

    let deferred = this.$q.defer();

    this.Spinner.show("outlet-location-create");

    console.log('saving...', newData);

    this.OutletLocationService.save(newData)
        .then((outletLocation)=>{
          // this.cardItemList.clearPossibleNewItem();
          // this.addOutletLocationInPosition(newData, outletLocation)
          this.Spinner.hide("outlet-location-create");
          
          deferred.resolve(outletLocation);
      }, (err) => {
        this.Spinner.hide("outlet-location-create");
        deferred.reject(err);
      });

    return deferred.promise;
  }  

  addOutletLocationInPosition(oldValue, outletLocation){
    // let indexBefore = -1;

    // this.outletLocations.forEach((s, index)=>{
    //   if (s.position <= outletLocation.position){
    //     indexBefore = index;
    //   }
    // })
    // this.outletLocations.splice(indexBefore+1, 0, outletLocation);

    // this.outletLocationGroup.addChild(outletLocation);
  }

  showCreateOutletLocation(){
    let isCreating = false;
    this.outletLocations.forEach((s, index)=>{
      if (s.id === undefined){
        isCreating = true;
      }
    });
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
      position: this.outletLocations && this.outletLocations.length ? (this.outletLocations[this.outletLocations.length-1]).position + 1000 : 0
    });
  }  

  deleteOutletLocation(outletLocation){

    this.Spinner.show("outlet-location-delete");
    outletLocation.delete()
      .then(()=>{
        this.Snack.show('Outlet location deleted');
      }).then(()=>{
        this.Spinner.hide("outlet-location-delete");
      }).catch(()=>{
        this.Snack.showError('Error deleting outlet location');
        this.Spinner.hide("outlet-location-delete");
      })
  }

  getPosition(outletLocation){
    return outletLocation.position || this.outletLocations ? this.outletLocations.filter((i)=>outletLocation.id===i.id)[0].position : 0;
  }  

  /* @ngInject */
  constructor($timeout, $stateParams, $q, Spinner, Snack, OutletLocationService) {
    "ngInject";
    this.Spinner = Spinner;
    this.Snack = Snack;
    this.OutletLocationService = OutletLocationService;
    this.$q = $q;
    this.$timeout = $timeout;
    this.venueId = $stateParams.venueId;
  }
}
