export default class staticMenuItemChildController {
  static get UID(){
    return "staticMenuItemChildController";
  }

  buildModifiers () {
    if (this.option.modifiers) {
      this.modifiers = this.option.modifiers.map((_modifier, index) => {

        return this.ModifierService.getById(_modifier.id);
      });
    }
  }

  constructor($filter, ModifierService) {
    'ngInject';
    
    this.ModifierService = ModifierService;
    this.formattedPrice = $filter('currency')(this.option.price);
    this.modifiers = [];

    this.buildModifiers();
  }
}
