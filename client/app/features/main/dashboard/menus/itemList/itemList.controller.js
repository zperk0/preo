
export default class itemListController {
  static get UID(){
    return "itemListController"
  }

  setItems(){
     Preoday.Menu.get(142)
      .then(this.handleFinishLoading.bind(this), this.handleError.bind(this,"FAILED_LOADING_MENU_ITEMS"))
      .catch((err)=>console.log("err",err));

  }

  handleFinishLoading(menu){
    this.$timeout(()=>{
      this.items = menu.sections[0].items;
      console.log("this items", this.items)
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
