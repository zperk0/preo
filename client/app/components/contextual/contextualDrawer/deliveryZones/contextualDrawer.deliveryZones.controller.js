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

  constructor($scope, $stateParams, $mdSidenav) {
    "ngInject";
    this.$mdSidenav = $mdSidenav;
    this.cancelledOutlets = [];
    this.data = [{name:'dz1'}, {name:'dz2'}];
  }
}
