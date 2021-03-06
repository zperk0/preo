export default class menuItemListController {

  static get UID() {
    return "menuItemListController"
  }

  deleteItem(item) {

    this.cardItemList.deleteItem(item);
  }

  showCreateItem($event, type) {

    let newItem =  this.ItemService.getNewItemBase(this.StateService.venue.id, type === 'VOUCHER');

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

        createdItem.setSize();

        createdItem.$show = true; //need show for animation
        this.Spinner.hide("item-clone")
        this.Snack.show(this.gettextCatalog.getString('Item duplicated'));
        console.log("cloned", createdItem, this.item);

        this.items.push(createdItem);

        this.$scope.scrollToBottom();
      }, (err)=>{
        console.log("failed creating item", err)
        this.Spinner.hide("item-clone")
        this.Snack.showError(this.gettextCatalog.getString('Failed duplicating item'));
      });
  }

  isInFilter (item, filterName) {

    if (this.types) {
      let validType = this.types.indexOf(item.voucherType) !== -1;
      if (!validType) {
        return false;
      }
    }

    return !filterName || (item.name && item.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1);
  }

  constructor($scope, $stateParams, Spinner, Snack, StateService, ItemService, FeatureService, gettextCatalog) {
    "ngInject";

    $scope.results = this.items;

    this.$scope = $scope;
    this.$stateParams = $stateParams;
    this.Spinner = Spinner;
    this.Snack = Snack;
    this.StateService = StateService;
    this.gettextCatalog = gettextCatalog;

    this.items = this.items === undefined ? [] : this.items;
    this.ItemService = ItemService;


    let itemTypes = ['NONE'];

    if (FeatureService.hasVoucherFeature()) {
      itemTypes.push('ALL');
      itemTypes.push('EMAIL');
      itemTypes.push('POST');
    }

    this.items = this.items.filter((item) => {

      return itemTypes.indexOf(item.voucherType) !== -1;
    });

  }
}
