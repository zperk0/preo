export default class staticModifierItemController {
  static get UID(){
    return "staticModifierItemController"
  }

  buildModifiers () {
    if (this.modifier && this.modifier.modifiers) {
      this.modifiers = this.modifier.modifiers.map((_modifier, index) => {

        return this.ModifierService.getById(_modifier.id);
      });
    }
  }

  constructor($filter, ModifierService) {
    'ngInject';

    this.ModifierService = ModifierService;
    this.modifiers = [];

    this.buildModifiers();
  }
}
