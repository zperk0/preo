export default class outletLocationController {
  static get UID(){
    return "outletLocationController";
  }

  onNewOutletMoved ($outlets, $partFrom, $partTo, $indexFrom, $indexTo) {

    if ($outlets && $outlets.length) {

      if (this.outletLocation.outletId) {
        this.Snack.showError(this.ErrorService.OUTLET_LOCATION_ALREADY_OUTLET.message);
        return;
      }

      if (!this.outletLocation.isSeat() && this.outletLocation.hasChildren()) {
        this.Snack.showError(this.ErrorService.OUTLET_LOCATION_LAST_CHILD.message);
        return;
      }

      console.log('moving here...', $outlets);

      this.Spinner.show("moving-outlet-to-location");

      this.outletLocation.outletId = $outlets[0].id;
      this.outletLocation.update()
        .then(() => {

          this.buildOutlet();
          this.Spinner.hide("moving-outlet-to-location");
        }, () => {

          this.Snack.showError(this.gettextCatalog.getString("Error adding outlet to outlet location"));
          this.Spinner.hide("moving-outlet-to-location");
        });
    }
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

    if (this.outletLocation && !this.outletLocation.id) {
      this.cardItemList.deleteItem(this.outletLocation);
    }
  }

  contextualMenuSuccess(entity){
    if (this.outletLocation && entity && entity.name){
      this.outletLocation = entity;

      if (!this.outletLocation.id){
        this.outletLocationListCtrl.createOutletLocation(this.outletLocation)
          .then((_outletLocation)=>{

            this.outletLocation.$selected = false;
            this.contextualMenu.hide();
            this.Snack.show(this.gettextCatalog.getString('Outlet location created'));
          }, (err)=>{
            console.log('error on save outlet location', err);
            this.Snack.showError(this.gettextCatalog.getString('Error saving outlet location'));
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
    this.Spinner.show("outlet-location-update");
    return this.$q((resolve, reject)=>{
      this.outletLocation.update()
        .then((o)=>{
          this.Snack.show(this.gettextCatalog.getString('Outlet location updated'));
          resolve(o);
      },()=>{
        reject();
        this.Snack.showError(this.gettextCatalog.getString('Error saving outlet location'));
      }).then(()=>{
        this.Spinner.hide("outlet-location-update");
      })
    });
  }


  onEdit ($event) {

    this.originalOutletLocation  = angular.copy(this.outletLocation);
    this.cardItemList.selectItem(this.outletLocation);
    this.contextual.showMenu(this.type, this.outletLocation, this.contextualMenuSuccess.bind(this), this.contextualMenuCancel.bind(this));
    $event.stopPropagation();
  }

  onAddSubGroup ($event) {

    if (this.outletLocation.isSeat()
        || this.outletLocation.hasChildren()
        || this.outletLocation.outletId) {

      return;
    }

    this.outletLocationGroupCtrl.changeGroup(this.outletLocation.createGroup());

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
        this.Snack.show(this.gettextCatalog.getString('Outlet location duplicated'));
      }, (err)=>{

        console.log("failed cloning outlet location", err)
        this.Spinner.hide("outlet-location-clone")
        this.Snack.showError(this.gettextCatalog.getString('Failed duplicating outlet location'));
    });

    $event.stopPropagation();
  }

  onDelete(){

    this.DialogService.delete(this.LabelService.TITLE_DELETE_OUTLET_LOCATION, this.LabelService.CONTENT_DELETE_OUTLET_LOCATION)
      .then(()=>{
        this.contextual.hide();
        this.outletLocationListCtrl.deleteOutletLocation(this.outletLocation);
      })
  }

  showSubGroup () {

    this.outletLocationGroupCtrl.changeGroup(this.outletLocation.createGroup());
  }

  removeOutlet () {

    this.Spinner.show("outlet-location-remove-outlet")

    this.outletLocation.outletId = null;
    this.outletLocation.update()
      .then(()=>{
        this.outlets = [];
        this.Spinner.hide("outlet-location-remove-outlet")
      }, (err)=>{
        this.Spinner.hide("outlet-location-remove-outlet")
        this.Snack.showError(this.gettextCatalog.getString('Failed to remove outlet'));
        console.log(err);
    });
  }

  onMove () {

    this.OutletLocationService.setOutletLocationToMove(this.outletLocation);
    this.contextual.showDrawer('outletLocations')
      .then((groupToMove) => {

        this.Spinner.show("outlet-location-move");

        console.log('moving to...', this.outletLocation, groupToMove);

        if (groupToMove.id === this.outletLocation.parent) {
          this.Spinner.hide("outlet-location-move");
          return;
        }

        this.outletLocation.move(groupToMove)
          .then(() => {

            this.Spinner.hide("outlet-location-move");
            this.Snack.show(this.gettextCatalog.getString('Outlet location moved'));
          }, () => {

            this.Spinner.hide("outlet-location-move");
            this.Snack.showError(this.gettextCatalog.getString('Failed to move outlet location'));
          }).catch((err)=>{
            console.log(err);
          });

      }, (err) => {

        console.log('err to move', err);
      });
  }

  buildOutlet() {

    this.outlets = [this.OutletService.findById(this.outletLocation.outletId)];
  }

  getOutletLocationName () {

    let fullName = [this.outletLocation.name];

    if (this.outletLocation.isSeat()) {
      fullName.push(' : ');
      fullName.push(this.outletLocation.seatStart);
      fullName.push('-');
      fullName.push(this.outletLocation.seatEnd);
    }

    return fullName.join('');
  }

  getAddSubGroupMessage () {

    if (this.outletLocation.isSeat()) {
      return this.ErrorService.OUTLET_LOCATION_SUB_GROUP_SEAT.message;
    }

    if (this.outletLocation.hasChildren()) {
      return this.ErrorService.OUTLET_LOCATION_SUB_GROUP_CHILDREN.message;
    }

    if (this.outletLocation.outletId) {
      return this.ErrorService.OUTLET_LOCATION_SUB_GROUP_OUTLET.message;
    }

    return this.gettextCatalog.getString('Add sub group');
  }

  constructor($rootScope, $q, BroadcastEvents, DialogService, Snack, LabelService, ErrorService, Spinner, $timeout, contextualMenu, contextual, gettextCatalog, OutletLocationService, OutletService) {
    "ngInject";

    this.$q =$q;
    this.Snack = Snack;
    this.Spinner = Spinner;
    this.$timeout = $timeout;
    this.DialogService = DialogService;
    this.LabelService = LabelService;
    this.ErrorService = ErrorService;
    this.OutletLocationService = OutletLocationService;
    this.OutletService = OutletService;
    this.contextualMenu = contextualMenu;
    this.contextual = contextual;
    this.gettextCatalog = gettextCatalog;
    this.type = 'outletLocation'; //type for contextual menu
    this.outlets = [];

    this.newModifiers = [];

    if (this.outletLocation && this.outletLocation.outletId) {
      this.buildOutlet();
    }

    //if it's a new outlet location we toggle the context menu to edit this
    if (this.outletLocation && !this.outletLocation.id) {
        this.contextual.showMenu(this.type, this.outletLocation, this.contextualMenuSuccess.bind(this), this.contextualMenuCancel.bind(this));
    }
  }
}
