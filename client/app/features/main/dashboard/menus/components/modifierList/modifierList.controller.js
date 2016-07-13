export default class modifierListController {
  static get UID(){
    return "modifierListController"
  }
  onClickNew(){
    this.ModifierService.showCreateModifier();
  }

  /* @ngInject */
  constructor(ModifierService) {
    'ngInject';
    this.ModifierService = ModifierService;
  }
}
