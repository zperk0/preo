
export default class itemListController {
  static get UID(){
    return "itemListController"
  }

  toggleDrawer(id){
    this.contextual.showDrawer(id);
  }

  setItems(venueId){
    this.ItemService.getItems(venueId)
      .then(this.handleFinishLoading.bind(this), this.handleError.bind(this,"FAILED_LOADING_MENU_ITEMS"))
      .catch((err)=>console.log("err",err));

  }

  handleFinishLoading(data){
    this.$timeout(()=>{
      this.data = {items:data.items.map((i, index)=>({id:i.id, item:i}))}
    })

  }
  handleError(menu){
    //TODO handle error
  }

  constructor($stateParams,$timeout, ItemService, contextual, FeatureService) {
    "ngInject";

    this.data = {items:[]}
    this.$timeout= $timeout;
    this.ItemService =ItemService;
    this.setItems($stateParams.venueId);
    this.contextual =contextual;

    FeatureService.hasFeature(Preoday.constants.Feature.NESTED_MODIFIER);    
  }
}
