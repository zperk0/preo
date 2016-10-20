export default class taxGroupController {
  static get UID(){
    return "taxGroupController"
  }

  saveOrUpdate(){
    if (this.taxGroup.id){
      return this.taxGroup.update();
    }
    else {
     return Preoday.Tax.create(this.taxGroup);
    }
  }

  contextualMenuSuccess(entity){
    this.Spinner.hide("tax-group-create");
    if (this.taxGroup && entity && entity.name){
      this.taxGroup = entity;
      this.saveOrUpdate().then((newTaxGroup)=>{

        this.taxGroup.$deleted = false;
        this.taxGroup.$selected = false;

        this.$timeout(() => {
          angular.extend(this.taxGroup, newTaxGroup);
          this.contextualMenu.hide();
          this.Spinner.hide("tax-group-create");
          this.Snack.show(this.gettextCatalog.getString('Tax Group saved'));
        });
      }, (err)=>{
        console.log('error on save tax-group', err);
        this.Spinner.hide("tax-group-create");
        this.Snack.showError(this.gettextCatalog.getString('Error saving tax Group'));
      }). catch((err)=>{
        console.log('error on save tax-group', err);
        this.Spinner.hide("tax-group-create");
        this.Snack.showError(this.gettextCatalog.getString('Error saving tax Group'));
      })
    }
  }


  onEdit ($event) {

    this.originalTaxGroup  = angular.copy(this.taxGroup);
    this.cardItemList.selectItem(this.taxGroup);
    this.showContextual();
    $event.stopPropagation();
  }

  onDelete(){

    this.DialogService.delete(this.LabelService.TITLE_DELETE_TAX_GROUP, this.LabelService.CONTENT_DELETE_TAX_GROUP)
      .then(()=>{
          this.Spinner.show("tax-group-delete");

          this.taxGroup.remove().
            then(()=>{
              this.cardItemList.onItemDeleted(this.taxGroup);
              if (this.onItemDeleted){
                this.onItemDeleted({item:this.taxGroup});
              }
              this.Snack.show('Tax group deleted');
              this.Spinner.hide("tax-group-delete");
          }, (error)=>{
            console.log("error");
            this.Spinner.hide("tax-group-delete")
            this.Snack.showError('Tax Group not deleted');
            if (error.status && error.status == 409){
              this.DialogService.show(this.ErrorService.TAX_GROUP_ASSIGNED_TO_ITEM.title, this.ErrorService.TAX_GROUP_ASSIGNED_TO_ITEM.message, [{
                name: this.gettextCatalog.getString('Got it')
              }]);
            }
          })
          .catch((err)=>{
            this.Spinner.hide("tax-group-delete")
            this.Snack.showError('Tax Group not deleted');
          });
      });
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
