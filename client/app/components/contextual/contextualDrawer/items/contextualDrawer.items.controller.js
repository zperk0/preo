export default class contextualDrawerItemController {
  static get UID(){
    return "ContextualDrawerItem";
  }
  close(){
    this.$mdSidenav('items').close()
      .then(function () {
        console.log("close ITEMS is done");
      });

  }

  onDestroy(){
    this.listener();
  }


  constructor($scope, ItemService, $stateParams,$mdSidenav) {
    "ngInject";
    this.data = {items:[]};
    this.$mdSidenav = $mdSidenav;
    this.$scope = $scope;


    ItemService.getItems($stateParams.venueId,'images,tags,modifiers').then((data)=>{
      this.data = data;
    })
  }
}
