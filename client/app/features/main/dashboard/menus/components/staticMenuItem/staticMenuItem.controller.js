export default class staticMenuItemController {
  static get UID(){
    return "staticMenuItemController";
  }

  buildModifiers () {
    if (this.item && this.item.modifiers){
      this.modifiers = this.item.modifiers.map((_modifier) => {

        let modifier = angular.copy(this.ModifierService.getById(_modifier.id));
        modifier.position = _modifier.position;

        return modifier;
      });
    }
  }

  constructor($filter, ModifierService) {
    "ngInject";
    
    this.ModifierService = ModifierService;
    this.formattedPrice = $filter('currency')(this.item.price);
    this.modifiers = [];
    
    this.buildModifiers();
  }
}
