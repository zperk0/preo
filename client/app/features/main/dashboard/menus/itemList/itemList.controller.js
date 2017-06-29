
export default class itemListController {

  static get UID(){
    return "itemListController"
  }

  toggleDrawer(id){
    this.contextual.showDrawer(id);
  }

  constructor($stateParams, $timeout, ItemService, contextual, FeatureService, Spinner, tags) {
    "ngInject";

    this.$timeout = $timeout;
    this.contextual = contextual;
    this.tags = tags;
    this.items = ItemService.getItems();
    this.loaded = true;

    FeatureService.hasFeature(Preoday.constants.Feature.NESTED_MODIFIER);
  }
}
