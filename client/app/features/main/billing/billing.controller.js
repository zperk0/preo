
export default class billingController {
  static get UID(){
    return "billingController"
  }

  init(){
    this.Spinner.show("billing")
    console.log("init billing controller", this.StateService.account)
    this.account = this.StateService.account;
    var promises = []
    promises.push(this.$q((resolve, reject)=>{
      this.account.getCard().then((card)=>{
        this.card = card;
        resolve();
      },()=>{
        this.card = {accountId:this.account.id};
        resolve();
      })
    }))
    promises.push(this.account.getPackages().then((packages)=>{
      this.packages = packages;
    }));
    this.$q.all(promises).then(()=>{
      this.$timeout(()=>{
        this.Spinner.hide("billing")
      }, ()=>{
        this.Spinner.hide("billing")
      })
    })
  }

  /* @ngInject */
  constructor($q, Spinner, Snack, MapsService, ErrorService, LabelService, $timeout, StateService) {
    "ngInject";
    this.Spinner = Spinner;
    this.Snack = Snack;
    this.$q = $q;
    this.ErrorService = ErrorService;
    this.MapsService = MapsService;
    this.StateService = StateService;
    this.LabelService = LabelService;
    this.isError = false;
    this.$timeout = $timeout;
    this.init();
  }
}
