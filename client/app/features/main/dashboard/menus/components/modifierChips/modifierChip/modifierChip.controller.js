export default class modifierChipController {
  static get UID(){
    return "modifierChipController"
  }

  removeFromParent(){
    if (this.item){
      this.ModifierService.removeFromItem(this.modifier,this.item)
    } else if (this.section){
      this.ModifierService.removeFromSection(this.modifier,this.section)
    }
  }

  constructor(ModifierService) {
    "ngInject";
    this.ModifierService = ModifierService;
  }
}
