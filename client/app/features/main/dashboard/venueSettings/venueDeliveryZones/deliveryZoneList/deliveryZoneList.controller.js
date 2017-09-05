export default class deliveryZoneListController {

  static get UID() {
    return "deliveryZoneListController"
  }

  showCreateItem(){

    this.DeliveryZoneService.showCreateDeliveryZone();
    this.$timeout(() => {
      this.contextual.showDrawer('deliveryZonesEdit')
        .then(() => {
          console.log('deliveryZone drawer closed successfully');
        }, () => {
          console.log('error opening deliveryZone drawer');
          this.DeliveryZoneService.cancelEditing();
        });
    });
  }

  constructor($scope, $stateParams, $timeout, Spinner, Snack, contextual, DeliveryZoneService) {
    "ngInject";

    this.$scope = $scope;
    this.$stateParams = $stateParams;
    this.$timeout = $timeout;
    this.Spinner = Spinner;
    this.DeliveryZoneService = DeliveryZoneService;
    this.Snack = Snack;
    this.contextual = contextual;
    this.maxItems = this.DeliveryZoneService.getMaxDeliveryZones();
  }
}
