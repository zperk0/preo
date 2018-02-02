
export default class taxRatesController {
  static get UID(){
    return 'taxRatesController';
  }

  onCreate() {
    this.$state.go('main.dashboard.taxes.taxRates.create');
  }

  onEdit(taxRate) {
    this.$state.go('main.dashboard.taxes.taxRates.edit', {
      taxRateId: taxRate.id
    });
  }

  onAfterDelete(taxRate) {
    const indexTaxRate = this.taxRates.indexOf(taxRate);
    if (indexTaxRate > -1) {
      this.taxRates.splice(indexTaxRate, 1);
    }
  }

  /* @ngInject */
  constructor($scope, $state, taxRates) {
    'ngInject';
    // Dependencies
    this.$scope = $scope;
    this.$state = $state;
    // Resolves and Defaults
    this.taxRates = taxRates;
    this.disabledSticky = true;

    const onViewContentLoaded = $scope.$on('$viewContentLoaded', (event, viewName) => {
      if (viewName.indexOf('taxDetailsView') === 0) {
        this.disabledSticky = false;
      }
    });

    $scope.$on('$destroy', () => {
      onViewContentLoaded && onViewContentLoaded();
    });
  }
}
