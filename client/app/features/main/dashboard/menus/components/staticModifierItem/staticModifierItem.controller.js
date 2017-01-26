export default class staticModifierItemController {
  static get UID(){
    return "staticModifierItemController"
  }

  constructor($filter, ModifierService) {
    'ngInject';

    this.ModifierService = ModifierService;
    this.modifiers = [];

    if (this.modifier && this.modifier.modifiers) {
      this.modifiers = this.modifier.modifiers.map((_modifier, index) => {

        return this.ModifierService.getById(_modifier.id);
      });
    }

    if (this.modifier && this.modifier.items) {
      this.modifier.items.forEach((_option) => {
        _option.formattedPrice = $filter('currency')(_option.price);

        if (!_option.modifiers) {
          return;
        }

        _option.modifiers = _option.modifiers.map((_modifier) => {
          return this.ModifierService.getById(_modifier.id);
        });
      });
    }
  }
}
