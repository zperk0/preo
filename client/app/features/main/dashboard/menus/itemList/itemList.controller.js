
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

  setItems(venueId) {

    this.ItemService.getItems(venueId)
      .then(this.handleFinishLoading.bind(this), this.handleError.bind(this,"FAILED_LOADING_MENU_ITEMS"))
      .catch((err)=> {

        this.handleError();
        console.log("err",err)
      });

  }

  handleFinishLoading(data) {

    this.$timeout(()=>{
      console.log('data here----', data);
      // {items:data.items.map((i, index)=>({id:i.id, item:i}))}
      this.data = data;

      this.hideSpinner();
    })

  }

  handleError(menu){
    
    this.hideSpinner();
  }

  constructor($stateParams, $timeout, ItemService, contextual, FeatureService, Spinner) {

    "ngInject";

    this.data = {items:[]}
    this.$timeout = $timeout;
    this.ItemService = ItemService;
    this.contextual = contextual;
    this.Spinner = Spinner;

    this.showSpinner();
    this.setItems($stateParams.venueId);

    FeatureService.hasFeature(Preoday.constants.Feature.NESTED_MODIFIER);    
  }
}
