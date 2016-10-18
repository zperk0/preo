export default class modifierListController {
  static get UID(){
    return "modifierListController"
  }
  onClickNew(){
    this.ModifierService.showCreateModifier();
  }

  isInFilter (modifier, filterName) {

    // return true;
    return !filterName || modifier.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1;
  }  

  /* @ngInject */
  constructor(ModifierService) {
    'ngInject';
    this.ModifierService = ModifierService;
  }
}
