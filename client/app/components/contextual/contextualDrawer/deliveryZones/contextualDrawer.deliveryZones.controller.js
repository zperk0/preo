export default class contextualDrawerOutletsController {
  static get UID(){
    return "ContextualDrawerDeliveryZones";
  }

  constructor($scope, $stateParams, $mdSidenav, DeliveryZoneService) {
    "ngInject";
    this.$mdSidenav = $mdSidenav;
    this.cancelledOutlets = [];
    DeliveryZoneService.getDeliveryZones().then(()=>{
      this.data = DeliveryZoneService.data
      console.log("got deliveryzones", this.data);
    })
  }
}
