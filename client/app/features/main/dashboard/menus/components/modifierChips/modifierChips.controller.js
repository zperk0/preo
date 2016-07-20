export default class modifierChipsController {
  static get UID(){
    return "modifierChipsController"
  }

  getModifiers(){
    return this.ModifierService.getByIds(this.modifiers.map((m)=>m.id));
  }

  constructor(ModifierService) {
    "ngInject";
    this.ModifierService = ModifierService;
  }
}
