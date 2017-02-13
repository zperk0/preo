export default class staticModifierChipsController {
  static get UID(){
    return "staticModifierChipsController"
  }

  buildModifiers(){
    // this.myModifiers = this.ModifierService.getByIds(this.modifiers.map((m)=>m.id));
    this.myModifiers = this.modifiers;
  }

  constructor($filter, ModifierService) {
    "ngInject";
    this.ModifierService = ModifierService;
    this.$filter = $filter;

    this.buildModifiers();
  }
}
