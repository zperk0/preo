
export default class modifierListController {
  static get UID(){
    return "modifierListController"
  }

  onClickNew(){
    this.ModifierService.showCreateModifier();
  }

  constructor(ModifierService, $stateParams) {
    "ngInject";
    this.ModifierService =ModifierService;
    ModifierService.getModifiers($stateParams.venueId,'modifiers').then((data)=>{
      console.log("got data", data)
      this.data = data;
    })

  }
}
