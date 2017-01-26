export default class staticModifierChipsController {
  static get UID(){
    return "staticModifierChipsController"
  }

  buildModifiers () {
    // let modifiers = this.ModifierService.getByIds(this.modifiers.map((m)=>m.id));

    this.myModifiers = this.modifiers.map((_modifier, index) => {
      let modifier = angular.copy(_modifier);

      if(_modifier.items) {
        modifier.items = _modifier.items.map((_item, index) => {
          return {
            name: _item.name,
            formmattedPrice: this.$filter('currency')(_item.price)
          }
        })
      }

      return modifier;
    });
  }

  constructor($filter, ModifierService) {
    "ngInject";
    this.ModifierService = ModifierService;
    this.$filter = $filter;

    this.buildModifiers();
  }
}
