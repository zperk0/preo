
export default class taxGroupsController {
  static get UID(){
    return "taxGroupsController"
  }


  init(){
    this.Spinner.show("fetch-tax");
    Preoday.Tax.getByVenueId(this.$stateParams.venueId)
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
  constructor(Spinner, Snack, $stateParams, ErrorService, LabelService, $timeout) {
    "ngInject";
    this.Spinner = Spinner;
    this.Snack = Snack;
    this.$stateParams = $stateParams;
    this.ErrorService = ErrorService;
    this.LabelService = LabelService;
    this.isError = false;
    this.$timeout = $timeout;
    this.init();

  }
}
