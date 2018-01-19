
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
  constructor($state, taxRates) {
    'ngInject';
    // Dependencies
    this.$state = $state;
    // Resolves and Defaults
    this.taxRates = taxRates;
  }
}
