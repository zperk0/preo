export default class outletLocationController {
  static get UID(){
    return "outletLocationController";
  }

  onNewOutletMoved ($outlets, $partFrom, $partTo, $indexFrom, $indexTo) {

    if ($outlets && $outlets.length) {

      if (!this.outletLocation.isSeat() && this.outletLocation.hasChildren() && !this.outletLocation.hasCustomChildren()) {
        this.Snack.showError(this.ErrorService.OUTLET_LOCATION_LAST_CHILD.message);
        return;
      }

      if (this.outletLocation.outletId) {
        this.Snack.showError(this.ErrorService.OUTLET_LOCATION_ALREADY_OUTLET.message);
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

      if (!this.outletLocation.toSeatFlag) {
        this.outletLocation.seatStart = null;
        this.outletLocation.seatEnd = null;
      }

      if (!this.outletLocation.id){
        this.outletLocationListCtrl.createOutletLocation(this.outletLocation)
          .then((_outletLocation)=>{

            this.outletLocation.$selected = false;
            this.contextualMenu.hide();

            if (this.outletLocation.isCustom()) {
              this.Snack.show(this.gettextCatalog.getString('Custom field created'));
            } else {
              this.Snack.show(this.gettextCatalog.getString('Outlet location created'));
            }
          }, (err)=>{
            console.log('error on save outlet location', err);

            if (this.outletLocation.isCustom()) {
              this.Snack.showError(this.gettextCatalog.getString('Error saving custom field'));
            } else {
              this.Snack.showError(this.gettextCatalog.getString('Error saving outlet location'));
            }

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

          if (this.outletLocation.isCustom()) {
            this.Snack.show(this.gettextCatalog.getString('Custom field updated'));
          } else {
            this.Snack.show(this.gettextCatalog.getString('Outlet location updated'));
          }
          resolve(o);
      },()=>{
        reject();

        if (this.outletLocation.isCustom()) {
          this.Snack.showError(this.gettextCatalog.getString('Error updating custom field'));
        } else {
          this.Snack.showError(this.gettextCatalog.getString('Error updating outlet location'));
        }
      }).then(()=>{
        this.Spinner.hide("outlet-location-update");
      })
    });
  }


  onEdit ($event) {

    if (this.outletLocation.isSeat()) {
      this.outletLocation.toSeatFlag = 1;
    }

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

  onAddCustomField ($event) {

    if (!this.outletLocation.outletId
        || this.outletLocation.hasCustomChildren()) {

      return;
    }

    this.outletLocationGroupCtrl.changeGroup(this.outletLocation.createGroup(true));

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

    let title = this.LabelService.TITLE_DELETE_OUTLET_LOCATION;
    let message = this.LabelService.CONTENT_DELETE_OUTLET_LOCATION;

    if (this.outletLocation.isCustom()) {
      title = this.LabelService.TITLE_DELETE_CUSTOM_FIELD;
      message = this.LabelService.CONTENT_DELETE_CUSTOM_FIELD;
    }

    this.DialogService.delete(title, message)
      .then(()=>{
        this.contextual.hide();
        this.outletLocationListCtrl.deleteOutletLocation(this.outletLocation);
      })
  }

  showSubGroup () {

    this.outletLocationGroupCtrl.changeGroup(this.outletLocation.createGroup());
  }

  removeOutlet () {

    if (this.outletLocation.hasCustomChildren()) {

      this.DialogService.delete(this.LabelService.TITLE_DELETE_OUTLET_CUSTOM_FIELD, this.LabelService.CONTENT_DELETE_OUTLET_CUSTOM_FIELD)
        .then(()=>{

          this.deleteOutletAndCustomFields();
        });
    } else {

      this.Spinner.show("outlet-location-remove-outlet");
      this.deleteOutlet()
        .then(() => {

          this.Spinner.hide("outlet-location-remove-outlet");
        }, () => {

          this.Spinner.hide("outlet-location-remove-outlet");
          this.Snack.showError(this.gettextCatalog.getString('Failed to remove outlet'));
        });
    }

  }

  deleteOutletAndCustomFields () {

    this.Spinner.show("outlet-location-remove-outlet-custom-fields");

    this.outletLocation.deleteCustomFields()
      .then(() => {

        this.deleteOutlet()
          .then(() => {

            this.Spinner.hide("outlet-location-remove-outlet-custom-fields");
          }, () => {
            this.Spinner.hide("outlet-location-remove-outlet-custom-fields");
            this.Snack.showError(this.gettextCatalog.getString('Failed to remove outlet'));
          });
      }, () => {

        this.Spinner.hide("outlet-location-remove-outlet-custom-fields");
        this.Snack.showError(this.gettextCatalog.getString('Failed to remove outlet'));
      });
  }

  deleteOutlet () {

    let deferred = this.$q.defer();

    this.outletLocation.outletId = null;
    this.outletLocation.update()
      .then(()=>{

        this.outlets = [];
        deferred.resolve();
      }, (err)=>{

        console.log(err);
        deferred.reject();
    });

    return deferred.promise;
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

  getAddCustomFieldMessage () {

    if (this.outletLocation.hasCustomChildren()) {
      return this.ErrorService.OUTLET_LOCATION_CUSTOM_FIELD_CHILDREN.message;
    }

    return this.gettextCatalog.getString('Add custom fields at checkout');
  }

  hasCustomOutletLocationFieldsFeature () {

    return this.FeatureService.hasCustomOutletLocationFieldsFeature();
  }

  constructor($rootScope, $q, BroadcastEvents, DialogService, Snack, LabelService, ErrorService, Spinner, $timeout, contextualMenu, contextual, gettextCatalog, OutletLocationService, OutletService, FeatureService) {
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
    this.FeatureService = FeatureService;
    this.type = 'outletLocation'; //type for contextual menu
    this.outlets = [];

    if (this.outletLocation && this.outletLocation.isCustom() && this.hasCustomOutletLocationFieldsFeature()) {
      this.type = 'customField';
    }

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
