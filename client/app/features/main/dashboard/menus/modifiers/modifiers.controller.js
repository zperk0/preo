
export default class modifiersController {
  static get UID(){
    return "modifiersController"
  }

  onClickNew(){
    console.log("on click showing created")
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
