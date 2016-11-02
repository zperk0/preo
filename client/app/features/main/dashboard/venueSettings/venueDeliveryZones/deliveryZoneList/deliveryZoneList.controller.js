export default class deliveryZoneListController {

  static get UID() {
    return "deliveryZoneListController"
  }


  constructor($scope, $stateParams, Spinner, Snack, ItemService) {
    "ngInject";

    $scope.results = this.items;

    this.$scope = $scope;
    this.$stateParams = $stateParams;
    this.Spinner = Spinner;
    this.Snack = Snack;

  }
}
