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
      venueId: this.$stateParams.venueId,
      $selected: true,
    });

    this.taxGroups.push(taxGroup);
  }

  /* @ngInject */
  constructor($stateParams) {
    "ngInject";
    this.$stateParams = $stateParams;
    this.title = "I am a taxGroupList component"
  }
}
