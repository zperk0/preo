export default class contextualDrawerItemController {
  static get UID(){
    return "ContextualDrawerItem";
  }

  close(){
    return this.$mdSidenav('items').close()
  }

  constructor($scope, ItemService, $stateParams,$mdSidenav) {
    "ngInject";
    this.data = {items:[]};
    this.$mdSidenav = $mdSidenav;
    this.$scope = $scope;
    this.cancelledItems = [];

    ItemService.getItems($stateParams.venueId).then((data)=>{
      this.data = data;
    })
  }
}
