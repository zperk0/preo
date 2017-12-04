
export default class customersPlaceholderController {
  static get UID(){
    return "customersPlaceholderController"
  }

  /* @ngInject */
  constructor($scope) {
    'ngInject';

    this.$scope = $scope;

    function _resetCustomerData() {
      this.customersCtrl = $scope['$customers'];
      this.customersCtrl.customersSearch = null;
      this.customersCtrl.searching = false;
      this.customersCtrl.customers = [];

      this.customersCtrl['$scope'].$broadcast('searchPanel:removeFocus');
    }

    $scope.$on('$customers:resolve:error', _resetCustomerData.bind(this));

    _resetCustomerData.call(this);

  }
}
