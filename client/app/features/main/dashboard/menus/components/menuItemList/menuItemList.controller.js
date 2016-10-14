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

  onClone (item, sectionId) {

    this.Spinner.show("item-clone")

    this.ItemService.cloneItem(item, null, null)
      .then((createdItem)=>{
        createdItem.$show = true; //need show for animation
        this.Spinner.hide("item-clone")
        this.Snack.show('Item duplicated');
        console.log("cloned", createdItem, this.item);
        
        this.items.push(createdItem);

        this.$scope.scrollToBottom();
      }, (err)=>{
        console.log("failed creating item", err)
        this.Spinner.hide("item-clone")
        this.Snack.showError('Failed duplicating item');
      });
  }

  constructor($scope, $stateParams, Spinner, Snack, ItemService) {
    "ngInject";

    $scope.results = this.items;

    this.$scope = $scope;
    this.$stateParams = $stateParams;
    this.Spinner = Spinner;
    this.Snack = Snack;

    this.items = this.items === undefined ? [] : this.items;
    this.ItemService = ItemService;
  }
}
