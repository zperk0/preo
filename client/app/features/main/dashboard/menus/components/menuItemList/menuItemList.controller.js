export default class menuItemListController {

  static get UID() {
    return "menuItemListController"
  }

  deleteItem(item) {

    this.cardItemList.deleteItem(item);
  }

  showCreateItem() {

    let newItem =  this.ItemService.getNewItemBase(this.$stateParams.venueId); 

    let isCreating = this.items.filter((s, index) => {

      return !s.id;
    }).length > 0;
    
    if (isCreating){
      return;
    }

    this.items.push(newItem);
  }

  constructor($scope, $stateParams, ItemService) {
    "ngInject";

    $scope.results = this.items;

    this.$scope = $scope;
    this.$stateParams = $stateParams;
    this.items = this.items === undefined ? [] : this.items;
    this.ItemService = ItemService;
  }
}
