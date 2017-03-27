export default class staticMenuItemController {
  static get UID(){
    return "staticMenuItemController";
  }

  onModifierRemoved (modifier) {

    this.ItemService.removeModifierFromItem(this.item.id, modifier);
  }

  buildModifiers () {
    if (this.item && this.item.modifiers){
      this.modifiers = this.item.modifiers.map((_modifier) => {

        let modifier = angular.copy(this.ModifierService.getById(_modifier.id)) || angular.copy(_modifier);
        modifier.position = _modifier.position;

        return modifier;
      });
    }
  }

  constructor($filter, ItemService, ModifierService) {
    "ngInject";
    
    this.ItemService = ItemService;
    this.ModifierService = ModifierService;
    this.formattedPrice = $filter('currency')(this.item.price);
    this.modifiers = [];
    
    this.buildModifiers();
  }
}
