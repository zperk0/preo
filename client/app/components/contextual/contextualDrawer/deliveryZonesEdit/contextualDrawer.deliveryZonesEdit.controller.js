export default class ContextualDrawerDeliveryZonesEditController {
  static get UID(){
    return "ContextualDrawerDeliveryZonesEdit";
  }

  submit(){
    if (this.deliveryZoneForm.$valid){
      this.DeliveryZoneService.saveEditableDeliveryZone()
        .then(()=>{
          return this.$mdSidenav('deliveryZonesEdit').close()
        }).then(function () {
          console.log("close deliveryZonesEdit is done");
        });
      }
  }

  setEditing(newVal){
    if (newVal !== undefined){
      this.isEditing = newVal
    } else {
      newVal = !newVal;
    }
  }

  constructor($scope, $stateParams, $mdSidenav, DeliveryZoneService) {
    "ngInject";
    this.$mdSidenav = $mdSidenav;
    this.DeliveryZoneService=DeliveryZoneService;
    this.editableData = DeliveryZoneService.editableData;
    this.isEditing = false;
    $scope.$watch('drawerDeliveryZonesEditCtrl.DeliveryZoneService.editableDeliveryZone',(newValue,oldValue)=>{
      console.log("on watch", newValue,oldValue);
      this.editableDeliveryZone = newValue;
    })

  }
}
