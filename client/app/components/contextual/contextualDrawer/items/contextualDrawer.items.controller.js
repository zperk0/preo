export default class contextualDrawerItemController {
  static get UID(){
    return "ContextualDrawerItem";
  }

  onNewItemMoved($item, $partFrom, $partTo, $indexFrom, $indexTo){
    console.log("on cancel move"); //dont need to do anything here, just want to cancel the move
  }

  close(){
    this.$mdSidenav('items').close()
      .then(function () {
        console.log("close ITEMS is done");
      });

  }

  constructor($scope, ItemService, $stateParams,$mdSidenav) {
    "ngInject";
    this.data = {items:[]};
    this.$mdSidenav = $mdSidenav;
    this.$scope = $scope;
    this.cancelledItems = [];


    ItemService.getItems($stateParams.venueId,'images,tags,modifiers').then((data)=>{
      this.data = data;
    })
  }
}
