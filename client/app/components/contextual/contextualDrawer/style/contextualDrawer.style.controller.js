export default class contextualDrawerStyleController {
  static get UID(){
    return "ContextualDrawerStyle";
  }

  close(){
    return this.$mdSidenav('style').close()
  }

  constructor($scope, $mdSidenav) {
    "ngInject";
    this.$mdSidenav = $mdSidenav;
    this.$scope = $scope;


  }
}
