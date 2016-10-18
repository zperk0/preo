
export default class taxGroupsController {
  static get UID(){
    return "taxGroupsController"
  }


  init(){
    Preoday.Tax.getByVenueId(this.$stateParams.venueId)
      .then((taxGroups)=>{
        this.taxGroups = taxGroups;
      }, (err)=>{
        console.log("error", err)
        this.isError = true;
      }) .catch((err)=>{
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
