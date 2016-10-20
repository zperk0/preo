
export default class taxGroupsController {
  static get UID(){
    return "taxGroupsController"
  }


  init(){
    this.Spinner.show("fetch-tax");
    this.TaxesService.getTaxGroups(true)
      .then((taxGroups)=>{
        this.taxGroups = taxGroups;
        this.Spinner.hide("fetch-tax");
      }, (err)=>{
        this.Spinner.hide("fetch-tax");
        console.log("error", err)
        this.isError = true;
      }) .catch((err)=>{
        this.Spinner.hide("fetch-tax");
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
