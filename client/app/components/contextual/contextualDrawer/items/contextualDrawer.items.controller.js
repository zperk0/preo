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

    $scope.$watch(()=>{
      return ItemService.data;
    },(newVal,oldVal)=>{
      if (newVal && newVal.items && newVal.items.length){
        this.data = {items:newVal.items.map((i, index)=>({id:i.id, position: i.position || (index + 1) + 1000, item:i}))};
      }
    }, true)

    ItemService.getItems($stateParams.venueId);
  }
}
