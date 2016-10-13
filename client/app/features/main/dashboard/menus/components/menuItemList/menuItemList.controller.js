export default class menuItemListController {

  static get UID() {
    return "menuItemListController"
  }

  deleteItem(item) {

    this.cardItemList.deleteItem(item);
  }

  showCreateItem() {

    let newItem =  this.ItemService.getNewItemBase(this.$stateParams.venueId);
    // let newItem = new Preoday.Item({
    //     $id: -1,
    //     $show: true,
    //     $selected: true,

    //     quantity: 1,
    //     $size: 0,
    //     visible: 1,
    //     tags: [],
    //     images: [],
    //     modifiers: [],
    //     position: 0,
    //     venueId: this.$stateParams.venueId
    // });       

    let isCreating = false;

    this.items.forEach((s, index)=>{
      if (!s.id){
        isCreating = true;
      }
    });
    if (isCreating){
      return;
    }

    this.items.push(newItem);
  }

  constructor($scope, $q, Snack, Spinner, $stateParams, UtilsService, contextual, DialogService, LabelService, ItemService, $timeout) {
    "ngInject";

    $scope.results = this.items;

    this.$scope = $scope;
    this.Snack = Snack;
    this.$stateParams = $stateParams;
    this.Spinner = Spinner;
    this.UtilsService = UtilsService;
    this.$q = $q;
    this.items = this.items === undefined ? [] : this.items;
    this.contextual = contextual;
    this.LabelService = LabelService;
    this.DialogService = DialogService;
    this.ItemService = ItemService;
    this.$timeout = $timeout;
  }
}
