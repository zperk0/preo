export default class deliveryZoneListController {

  static get UID() {
    return "deliveryZoneListController"
  }


  showCreateItem(){
    this.DeliveryZoneService.showCreateDeliveryZone();
  }

  constructor($scope, $stateParams, Spinner, Snack, DeliveryZoneService) {
    "ngInject";


    this.$scope = $scope;
    this.$stateParams = $stateParams;
    this.Spinner = Spinner;
    this.DeliveryZoneService = DeliveryZoneService;
    this.Snack = Snack;
    this.maxItems = this.DeliveryZoneService.getMaxDeliveryZones();
  }
}
