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

  constructor($scope, ItemService, $stateParams,$mdSidenav) {
    "ngInject";
    this.$mdSidenav = $mdSidenav;
    console.log("getting items");
    ItemService.getItems($stateParams.venueId,'images,tags,modifiers').then((items)=>{
      console.log("got items", items);
      this.items = items;
    })
  }
}
