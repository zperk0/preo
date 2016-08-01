export default class outletLocationController {
  static get UID(){
    return "outletLocationController";
  }

  restoreOriginalValues(){
    if (this.originalOutletLocation){
      angular.extend(this.outletLocation, this.originalOutletLocation)
      this.originalOutletLocation = false;
    }
  }  

  contextualMenuCancel(){
    this.restoreOriginalValues();
    this.outletLocation.$selected = false;
    this.cardItemList.clearPossibleNewItem();
  }

  contextualMenuSuccess(entity){
    if (this.outletLocation && entity){
      this.outletLocation = entity;

      if (!this.outletLocation.id){
        this.outletLocationListCtrl.createOutletLocation(this.outletLocation)
          .then((_outletLocation)=>{

            this.outletLocation.$selected = false;
            this.contextualMenu.hide();
            this.Snack.show('Outlet location created');
          }, (err)=>{
            console.log('error on save outlet location', err);
            this.Snack.showError('Error saving outlet location');
          })

      } else {
        this.updateOutletLocation().then(()=>{
          this.contextualMenu.hide();
          this.outletLocation.$selected = false;
        })
      }
    }
  }  

  updateOutletLocation(){
    this.Spinner.show("outlet-location-save");
    return this.$q((resolve, reject)=>{
      this.outletLocation.update()
        .then((o)=>{
          this.Snack.show('Outlet location updated');
          resolve(o);
      },()=>{
        reject();
        this.Snack.showError('Error saving outlet location');
      }).then(()=>{
        this.Spinner.hide("outlet-location-save");
      })

      console.log("resolved");
    });
  }


  onEdit ($event) {

    this.originalOutletLocation  = angular.copy(this.outletLocation);
    this.cardItemList.selectItem(this.outletLocation);
    this.contextual.showMenu(this.type, this.outletLocation, this.contextualMenuSuccess.bind(this), this.contextualMenuCancel.bind(this));
    $event.stopPropagation();
  }

  onClone($event){

    this.Spinner.show("outlet-location-clone")
    let clonePosition = this.outletLocationListCtrl.getPosition(this.outletLocation);
    this.outletLocation.clone({
      position: clonePosition
    })
      .then((createdOutlet)=>{
        this.Spinner.hide("outlet-location-clone")
        this.Snack.show('Outlet location duplicated');
        console.log("cloned", createdOutlet, this.outletLocation);
        // this.cardItemList.onItemCreated(createdOutlet);
        // if (this.onItemCreated){
        //   this.onItemCreated({item:createdItem});
        // }
      }, (err)=>{
        console.log("failed creating item", err)
        this.Spinner.hide("outlet-location-clone")
        this.Snack.showError('Failed duplicating outlet location');
    });

    $event.stopPropagation();
  }  

  onDelete(){
    this.DialogService.delete(this.LabelService.TITLE_DELETE_OUTLET_LOCATION, this.LabelService.CONTENT_DELETE_OUTLET_LOCATION)
      .then(()=>{
        this.outletLocationListCtrl.deleteOutletLocation(this.outletLocation)
      })
  }

  showSubGroup () {
    console.log('should show sub group here');
  }

  constructor($rootScope, $q, BroadcastEvents, DialogService, Snack, $stateParams, LabelService, Spinner, $timeout, contextualMenu, contextual, OutletLocationService) {
    "ngInject";

    this.$q =$q;
    this.Snack = Snack;
    this.Spinner = Spinner;
    this.$stateParams = $stateParams;
    this.$timeout = $timeout;
    this.DialogService = DialogService;
    this.LabelService = LabelService;
    this.OutletLocationService = OutletLocationService;
    this.contextualMenu = contextualMenu;
    this.contextual = contextual;
    this.type = 'outletLocation'; //type for contextual menu

    //if it's a new outlet location we toggle the context menu to edit this
    if (this.outletLocation && !this.outletLocation.id) {
        console.log("here ho");
        this.contextual.showMenu(this.type, this.outletLocation, this.contextualMenuSuccess.bind(this), this.contextualMenuCancel.bind(this));
    }
  }
}
