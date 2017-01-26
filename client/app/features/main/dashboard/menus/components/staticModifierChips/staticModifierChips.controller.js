export default class staticModifierChipsController {
  static get UID(){
    return "staticModifierChipsController"
  }

  getModifiers(){
    // let modifiers = this.ModifierService.getByIds(this.modifiers.map((m)=>m.id));
    let modifiers = angular.copy(this.modifiers);

    modifiers.forEach((_modifier, index) => {

      if(_modifier.items) {
        _modifier.items.forEach((_item, index) => {

          _item.formmattedPrice = $filter('currency')(_item.price);
        });
      }

    });

    return modifiers;
  }

  constructor($filter, ModifierService) {
    "ngInject";
    this.ModifierService = ModifierService;
  }
}
