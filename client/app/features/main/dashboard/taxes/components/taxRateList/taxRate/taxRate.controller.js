export default class taxRateController {
  static get UID(){
    return "taxRateController"
  }

  saveOrUpdate(){
    if (this.taxRate.id){
      return this.taxRate.update();
    }
    else {
     return Preoday.TaxRate.create(this.taxRate);
    }
  }

  contextualMenuSuccess(entity){
    this.Spinner.show("tax-rate-create");
    if (this.taxRate && entity && entity.name){
      this.taxRate = entity;
      this.saveOrUpdate().then((newTaxRate)=>{

        this.taxRate.$deleted = false;
        this.taxRate.$selected = false;

        this.$timeout(() => {
          angular.extend(this.taxRate, newTaxRate);
          this.contextualMenu.hide();
          this.Spinner.hide("tax-rate-create");
          this.Snack.show(this.gettextCatalog.getString('Tax rate saved'));
        });
      }, (err)=>{
        console.log('error on save tax-rate', err);
        this.Spinner.hide("tax-rate-create");
        this.Snack.showError(this.gettextCatalog.getString('Error saving tax rate'));
      }). catch((err)=>{
        console.log('error on save tax-rate', err);
        this.Spinner.hide("tax-rate-create");
        this.Snack.showError(this.gettextCatalog.getString('Error saving tax rate'));
      })
    }
  }


  onEdit ($event) {

    this.originalTaxRate  = angular.copy(this.taxRate);
    this.cardItemList.selectItem(this.taxRate);
    this.showContextual();
    $event.stopPropagation();
  }

  onDelete(){

    this.DialogService.delete(this.LabelService.TITLE_DELETE_TAX_RATE, this.LabelService.CONTENT_DELETE_TAX_RATE)
      .then(()=>{
          this.Spinner.show("tax-rate-delete");

          this.taxRate.remove().
            then(()=>{
              this.cardItemList.onItemDeleted(this.taxRate);
              if (this.onItemDeleted){
                this.onItemDeleted({item:this.taxRate});
              }
              this.Snack.show(this.gettextCatalog.getString('Tax rate deleted'));
              this.Spinner.hide("tax-rate-delete");
          }, (error)=>{
            console.log("error");
            this.Spinner.hide("tax-rate-delete")
            this.Snack.showError(this.gettextCatalog.getString('Tax rate not deleted'));
            if (error.status && error.status == 409){
              this.DialogService.show(this.ErrorService.TAX_RATE_ASSIGNED_TO_GROUP.title, this.ErrorService.TAX_RATE_ASSIGNED_TO_GROUP.message, [{
                name: this.gettextCatalog.getString('Got it')
              }]);
            }
          })
          .catch((err)=>{
            this.Spinner.hide("tax-rate-delete")
            this.Snack.showError(this.gettextCatalog.getString('Tax rate not deleted'));
          });
      });
  }


  restoreOriginalValues() {
    if (this.originalTaxRate){
      angular.extend(this.taxRate, this.originalTaxRate);
      this.originalTaxRate = false;
    }
  }

  contextualMenuCancel() {

    this.restoreOriginalValues();
    this.taxRate.$selected = false;

    if (this.taxRate && !this.taxRate.id) {
      this.cardItemList.deleteItem(this.taxRate);
    }
  }

   showContextual () {
    this.contextual.showMenu(this.type, this.taxRate, this.contextualMenuSuccess.bind(this), this.contextualMenuCancel.bind(this));
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
    this.type = 'taxRate';
    this.gettextCatalog = gettextCatalog;

     if (this.taxRate && !this.taxRate.id) {
      this.showContextual();
    }
  }
}
