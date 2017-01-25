export default class staticMenuItemController {
  static get UID(){
    return "staticMenuItemController";
  }

  constructor($scope, $filter, ModifierService) {
    "ngInject";
    this.$scope = $scope;
    this.ModifierService = ModifierService;
    this.item.formattedPrice = $filter('currency')(this.item.price);
    this.modifiers = [];

    
    if (this.item && this.item.modifiers) {
      this.modifiers = this.item.modifiers.map((_modifier) => {

        let modifier = angular.copy(this.ModifierService.getById(_modifier.id));
        modifier.position = _modifier.position;

        return modifier;
      });
    }

    if (this.item && this.item.$size && this.item.$size.items) {
      this.item.$size.items.forEach((_size) => {
        _size.formattedPrice = $filter('currency')(_size.price);

        if (!_size.modifiers) {
          return;
        }

        _size.modifiers = _size.modifiers.map((_modifier) => {
          return this.ModifierService.getById(_modifier.id);
        });
      });
    }
  }
}
