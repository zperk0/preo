export default class taxGroupFormController {
  static get UID(){
    return "taxGroupFormController"
  }

  indexOf(taxRate) {
    let rates = this.taxGroup.rates || [];
    return rates.findIndex((visit) => {
      return visit.id === taxRate.id;
    });
  }

  isSelected(taxRate) {
    return this.indexOf(taxRate) > -1;
  }

  toggleCheckbox(taxRate) {
    this.taxGroup.rates = this.taxGroup.rates || []

    let index = this.indexOf(taxRate)
    if ( index < 0 ) {
      this.taxGroup.rates.push(taxRate);
    } else {
      this.taxGroup.rates.splice(index, 1);
    }
  }

  constructor(TaxesService) {
    "ngInject";

    this.loading = true;

    TaxesService.getTaxRates()
      .then((taxes)=>{
        this.taxes  = taxes;
        this.loading = false;
      }, () => {
        this.taxes = [];
        this.loading = false;
      });

  }
}
