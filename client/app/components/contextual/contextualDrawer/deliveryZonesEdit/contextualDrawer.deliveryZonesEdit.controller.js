export default class ContextualDrawerDeliveryZonesEditController {
  static get UID(){
    return "ContextualDrawerDeliveryZonesEdit";
  }

  onCancel(){
    this.DeliveryZoneService.cancelEditing()
    this.$mdSidenav('deliveryZonesEdit').close()
    console.log("close deliveryZonesEdit is done", this.deliveryZoneForm);
  }

  submit(){
    console.log("this delivery zone form ", this.deliveryZoneForm);
    if (this.deliveryZoneForm.$valid){
      this.DeliveryZoneService.saveEditableDeliveryZone()
        .then(()=>{
          return this.$mdSidenav('deliveryZonesEdit').close()
        }).then(()=>{
          console.log("close deliveryZonesEdit is done", this.deliveryZoneForm);
        });
      }
  }

  clearPolygon(){
    this.editableDeliveryZone.polygon = [];
  }

  constructor($scope, $stateParams, gettextCatalog, $mdSidenav, DeliveryZoneService, VenueService) {
    "ngInject";
    this.$mdSidenav = $mdSidenav;
    this.DeliveryZoneService=DeliveryZoneService;
    this.editableData = DeliveryZoneService.editableData;
    this.distanceUnit = VenueService.getKmOrMiles();
    this.translatedDistanceUnit = "kms";
    if (this.distanceUnit === "kms") this.translatedDistanceUnit = gettextCatalog.getString("kms")
    else if (this.distanceUnit === "miles") this.translatedDistanceUnit = gettextCatalog.getString("miles");

    this.isEditing = false;
    $scope.$watch('drawerDeliveryZonesEditCtrl.DeliveryZoneService.editableDeliveryZone',(newValue,oldValue)=>{
      console.log("on watch", newValue,oldValue);
      this.editableDeliveryZone = newValue;
    })

  }
}
