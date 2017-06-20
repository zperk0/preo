
export default class itemListController {

  static get UID(){
    return "itemListController"
  }

  showSpinner(){
    this.Spinner.show("item-list");
  }

  hideSpinner(){
    this.Spinner.hide("item-list");
  }

  toggleDrawer(id){
    this.contextual.showDrawer(id);
  }

  getItems() {
    this.items = this.ItemService.getItems();

    console.log('items here----', this.items);
    // {items:data.items.map((i, index)=>({id:i.id, item:i}))}

    this.loaded = true;
  }

  constructor($stateParams, $timeout, ItemService, contextual, FeatureService, Spinner, tags) {

    "ngInject";

    this.data = {items:[]}
    this.$timeout = $timeout;
    this.ItemService = ItemService;
    this.contextual = contextual;
    this.Spinner = Spinner;
    this.loaded = false;
    this.tags = tags;

    this.getItems();

    FeatureService.hasFeature(Preoday.constants.Feature.NESTED_MODIFIER);
  }
}
