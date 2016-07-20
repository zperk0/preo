
export default class modifiersController {
  static get UID(){
    return "modifiersController"
  }
  constructor(ModifierService, $stateParams) {
    "ngInject";
    ModifierService.getModifiers($stateParams.venueId).then((data)=>{
      console.log("got data", data)
      this.data = data;
    })

  }
}
