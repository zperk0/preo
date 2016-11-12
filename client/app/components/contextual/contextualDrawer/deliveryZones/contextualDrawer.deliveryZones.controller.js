export default class contextualDrawerOutletsController {
  static get UID(){
    return "ContextualDrawerDeliveryZones";
  }

  close(){
    this.$mdSidenav('outlets').close()
      .then(function () {
        console.log("close Modifiers is done");
      });

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
