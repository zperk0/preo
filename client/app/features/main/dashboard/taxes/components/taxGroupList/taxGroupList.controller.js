export default class taxGroupListController {
  static get UID(){
    return "taxGroupListController"
  }

    showCreate(){
      let isCreating = this.taxGroups.filter(function (item) {
        return item.id === undefined;
      }).length;

    if (isCreating){
      console.log("Not showing taxGroup new, already showing")
      return;
    }

    let taxGroup = new Preoday.Tax({
      venueId: this.StateService.venue.id,
      $selected: true,
    });

    this.taxGroups.push(taxGroup);
  }

  /* @ngInject */
  constructor($stateParams, StateService) {
    "ngInject";
    this.$stateParams = $stateParams;
    this.StateService = StateService;
    this.title = "I am a taxGroupList component"
  }
}
