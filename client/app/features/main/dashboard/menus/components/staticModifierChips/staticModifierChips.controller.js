export default class staticModifierChipsController {
  static get UID(){
    return "staticModifierChipsController"
  }

  getModifiers(){
    // return this.ModifierService.getByIds(this.modifiers.map((m)=>m.id));
    return this.modifiers;
  }

  constructor(ModifierService) {
    "ngInject";
    this.ModifierService = ModifierService;
  }
}
