
export default class taxRateDetailsController {

  static get UID(){
    return 'taxRateDetailsController';
  }

  createOrUpdate() {
    const {taxRate} = this;
    if (taxRate.id) {
      return taxRate.update();
    }
    return Preoday.TaxRate.create(taxRate);
  }

  onSaveVenue(entity) {
    const {taxRate, Spinner, Snack, $timeout, $state, gettextCatalog} = this;
    const LOADER_KEY = 'tax-rate-save';

    if (!angular.isObject(taxRate) || !angular.isObject(entity) || !entity.name) {
      return;
    }

    Spinner.show(LOADER_KEY);
    this.createOrUpdate()
      .then((data) => {
        // Set $saved to property
        this.$saved = true;

        taxRate.$deleted = false;

        $timeout(() => {
          angular.extend(taxRate, data);
          Snack.show(gettextCatalog.getString('Tax rate saved'));
          $state.go('main.dashboard.taxes.taxRates');
        });
      }).catch((err) => {
        Snack.showError(gettextCatalog.getString('Error saving tax rate'));
      }).finally(() => {
        Spinner.hide(LOADER_KEY);
      });
  }

  onCancel() {
    this.$state.go('main.dashboard.taxes.taxRates');
  }

  constructor($scope, $state, $timeout, Spinner, Snack, gettextCatalog, taxRates, taxRate) {
    'ngInject';
    // Dependencies
    this.$state = $state;
    this.$timeout = $timeout;
    this.Spinner = Spinner;
    this.Snack = Snack;
    this.gettextCatalog = gettextCatalog;
    // Resolves and defaults
    this.taxRates = taxRates;
    this.taxRate = taxRate;
    this.template = 'taxRate';

    // Set default `$saved` property
    this.$saved = false;

    // Create a copy of the original data
    this.originalTaxRate = angular.copy(taxRate);

    $scope.$on('$destroy', () => {
      if (angular.isObject(this.taxRate)) {
        // Reset editable `taxRate` to original value
        if (this.taxRate.id && !this.$saved) {
          angular.extend(this.taxRate, this.originalTaxRate);
        } else if (!this.taxRate.id) {
          // Remove `new taxRate` object
          const indexTaxRate = this.taxRates.indexOf(taxRate);
          if (indexTaxRate > -1) {
            this.taxRates.splice(indexTaxRate, 1);
          }
        }
      }
    });
  }
}
