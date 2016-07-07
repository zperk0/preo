
export default class modifierListController {
  static get UID(){
    return "modifierListController"
  }

  constructor(ModifierService, $stateParams) {
    "ngInject";

    ModifierService.getModifiers($stateParams.venueId,'modifiers').then((modifiers)=>{
      this.modifiers = modifiers;
    })

  }
}
