
export default class taxRatesController {
  static get UID(){
    return "taxRatesController"
  }


  init(){
    this.Spinner.show("fetch-tax-rates");
    this.TaxesService.getTaxRates(true)
      .then((taxRates)=>{
        this.taxRates = taxRates;
        this.Spinner.hide("fetch-tax-rates");
      }, (err)=>{
        this.Spinner.hide("fetch-tax-rates");
        console.log("error", err)
        this.isError = true;
      }) .catch((err)=>{
        this.Spinner.hide("fetch-tax-rates");
        console.log("error", err)
        this.isError = true;
      })
  }

  /* @ngInject */
  constructor(Spinner, Snack,ErrorService, LabelService, TaxesService,  $timeout) {
    "ngInject";
    this.Spinner = Spinner;
    this.Snack = Snack;
    this.ErrorService = ErrorService;
    this.LabelService = LabelService;
    this.TaxesService = TaxesService;
    this.isError = false;
    this.$timeout = $timeout;
    this.init();

  }
}
