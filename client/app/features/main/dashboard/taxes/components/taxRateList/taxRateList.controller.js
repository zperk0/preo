export default class taxRateListController {
  static get UID(){
    return "taxRateListController"
  }

    showCreate(){
      let isCreating = this.taxRates.filter(function (item) {
        return item.id === undefined;
      }).length;

    if (isCreating){
      console.log("Not showing taxRate new, already showing")
      return;
    }

    let taxRate = new Preoday.TaxRate({
      venueId: this.$stateParams.venueId,
      $selected: true,
    });

    this.taxRates.push(taxRate);
  }

  /* @ngInject */
  constructor($stateParams) {
    "ngInject";
    this.$stateParams = $stateParams;
    this.title = "I am a taxRateList component"
  }
}
