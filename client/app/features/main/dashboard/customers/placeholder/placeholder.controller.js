
export default class customersPlaceholderController {
  static get UID(){
    return "customersPlaceholderController"
  }



  /* @ngInject */
  constructor($scope) {
    'ngInject';

    this.$scope = $scope;

    this.customersCtrl = $scope['$customers'];
    this.customersCtrl.customersSearch = null;
    this.customersCtrl.customers = [];

    this.customersCtrl['$scope'].$broadcast('searchPanel:removeFocus');

  }
}
