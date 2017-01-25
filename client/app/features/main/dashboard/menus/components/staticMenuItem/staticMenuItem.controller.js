export default class staticMenuItemController {
  static get UID(){
    return "staticMenuItemController";
  }

  constructor($scope, ModifierService) {
    "ngInject";
    this.$scope =$scope;
    this.ModifierService = ModifierService;

    this.modifiers = [];

    
    if (this.item && this.item.modifiers){
      this.modifiers = this.item.modifiers.map((_modifier) => {

        let modifier = angular.copy(this.ModifierService.getById(_modifier.id));
        modifier.position = _modifier.position;

        return modifier;
      });
    }
  }
}
