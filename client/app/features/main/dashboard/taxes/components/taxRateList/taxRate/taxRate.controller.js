export default class taxRateController {
  static get UID() {
    return 'taxRateController';
  }

  isSelected() {
    const {$stateParams, taxRate} = this;
    return angular.isObject(taxRate)
      && (taxRate.id == $stateParams.taxRateId)
      || (!taxRate.id && !$stateParams.taxRateId);
  }

  onDelete() {
    const {DialogService, LabelService, ErrorService, Snack, Spinner, gettextCatalog, taxRate} = this;
    const LOADER_KEY = 'tax-rate-delete';

    DialogService.delete(LabelService.TITLE_DELETE_TAX_RATE, LabelService.CONTENT_DELETE_TAX_RATE)
      .then(() => {
        Spinner.show(LOADER_KEY);

        taxRate.remove()
          .then(() => {
            if (angular.isFunction(this.onAfterDelete)) {
              this.onAfterDelete({taxRate: taxRate});
            }
            Snack.show(gettextCatalog.getString('Tax rate deleted'));
            Spinner.hide(LOADER_KEY);
          }).catch((err) => {
            if (err.status && err.status == 409) {
              DialogService.show(ErrorService.TAX_RATE_ASSIGNED_TO_GROUP.title, ErrorService.TAX_RATE_ASSIGNED_TO_GROUP.message, [{
                name: gettextCatalog.getString('Got it')
              }]);
            }
            Spinner.hide(LOADER_KEY);
            Snack.showError(gettextCatalog.getString('Tax rate not deleted'));
          });
      });
  }

  /* @ngInject */
  constructor(DialogService, LabelService, ErrorService, Spinner, Snack, gettextCatalog, $stateParams) {
    'ngInject';
    this.DialogService = DialogService;
    this.LabelService = LabelService;
    this.ErrorService = ErrorService;
    this.Spinner = Spinner;
    this.Snack = Snack;
    this.gettextCatalog = gettextCatalog;
    this.$stateParams = $stateParams;
  }
}
