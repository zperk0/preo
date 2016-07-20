export default class modifierChipController {
  static get UID(){
    return "modifierChipController"
  }

  removeFromParent(){
    if (this.item){
      this.ModifierService.removeFromItem(this.modifier,this.item)
    } else if (this.section){
      this.ModifierService.removeFromSection(this.modifier,this.section)
    } else if (this.parent){
      this.ModifierService.removeFromParent(this.modifier,this.parent)
    } else if (this.modifierItem){
      this.ModifierService.removeFromModifierItem(this.modifier,this.modifierItem)
    }
  }

  constructor(ModifierService) {
    "ngInject";
    this.ModifierService = ModifierService;
  }
}
