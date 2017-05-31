export default class tagSelectController {
  static get UID() {
    return "tagSelectController"
  }

  transformChip(chip) {
    if (angular.isObject(chip)) {
      return chip;
    }

    return { name: chip };
  }

  querySearch(query) {
    var results = query ? this.collection.filter(item => {
      return item.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
    }) : [];
    return results;
  }

  constructor() {
    "ngInject";

    this.selectedItem = null;
    this.searchText = null;
    this.ngModel = this.ngModel || [];
    this.separatorKeys = [13, 188];
  }
}
