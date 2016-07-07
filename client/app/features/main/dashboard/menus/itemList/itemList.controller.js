
export default class itemListController {
  static get UID(){
    return "itemListController"
  }

  toggleDrawer(id){
    this.contextual.showDrawer(id);
  }

  setItems(venueId){
    this.ItemService.getItems(venueId, 'modifiers,images,tags')
      .then(this.handleFinishLoading.bind(this), this.handleError.bind(this,"FAILED_LOADING_MENU_ITEMS"))
      .catch((err)=>console.log("err",err));

  }

  handleFinishLoading(items){
    this.$timeout(()=>{
      this.items = items
    })

  }
  handleError(menu){
    //TODO handle error
  }

  constructor($stateParams,$timeout, ItemService, contextual) {
    "ngInject";
    this.$timeout= $timeout;
    this.ItemService =ItemService;
    this.setItems($stateParams.venueId);
    this.contextual =contextual;
  }
}
