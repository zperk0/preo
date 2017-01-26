export default class staticModifierItemController {
  static get UID(){
    return "staticModifierItemController"
  }

  constructor(ModifierService) {
    'ngInject';

    this.ModifierService = ModifierService;
    this.modifiers = [];

    if (this.modifier && this.modifier.modifiers) {
      this.modifiers = this.modifier.modifiers.map((_modifier, index) => {

        return this.ModifierService.getById(_modifier.id);
      });
    }
  }
}
