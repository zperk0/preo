
export default class itemListController {
  static get UID(){
    return "itemListController"
  }

  setItems(venueId){
    Preoday.Item.getAll({venueId:venueId})
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

  constructor($stateParams,$timeout) {
    "ngInject";
    this.setItems($stateParams.venueId);
    this.$timeout= $timeout;
  }
}
