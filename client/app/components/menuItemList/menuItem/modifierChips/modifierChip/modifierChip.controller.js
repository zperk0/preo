export default class modifierChipController {
  static get UID(){
    return "modifierChipController"
  }

  removeFromItem(){
    this.ModifierService.removeFromItem(this.modifier,this.item)
  }

  constructor(ModifierService) {
    "ngInject";
    this.ModifierService = ModifierService;
  }
}
