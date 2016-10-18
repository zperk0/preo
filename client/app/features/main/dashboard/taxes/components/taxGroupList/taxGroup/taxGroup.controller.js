export default class taxGroupController {
  static get UID(){
    return "taxGroupController"
  }
  contextualMenuSuccess(entity){
    console.log("Success saving taxGroup", entity);
    if (this.taxGroup && entity && entity.name){

    }
  }

  restoreOriginalValues() {
    if (this.originalTaxGroup){
      angular.extend(this.taxGroup, this.originalTaxGroup);
      this.originalTaxGroup = false;
    }
  }

  contextualMenuCancel() {

    this.restoreOriginalValues();
    this.taxGroup.$selected = false;

    if (this.taxGroup && !this.taxGroup.id) {
      this.cardItemList.deleteItem(this.taxGroup);
    }
  }

   showContextual () {
    this.contextual.showMenu(this.type, this.taxGroup, this.contextualMenuSuccess.bind(this), this.contextualMenuCancel.bind(this));
  }

  /* @ngInject */
  constructor($q, $timeout, Spinner, Snack, contextualMenu, contextual, DialogService, LabelService, ErrorService, gettextCatalog) {
    "ngInject";
    this.$q = $q;
    this.$timeout = $timeout;
    this.Spinner = Spinner;
    this.Snack = Snack;
    this.contextualMenu = contextualMenu;
    this.contextual = contextual;
    this.DialogService = DialogService;
    this.LabelService = LabelService;
    this.ErrorService = ErrorService;
    this.type = 'taxGroup';
    this.gettextCatalog = gettextCatalog;

     if (this.taxGroup && !this.taxGroup.id) {
      this.showContextual();
    }
  }
}
