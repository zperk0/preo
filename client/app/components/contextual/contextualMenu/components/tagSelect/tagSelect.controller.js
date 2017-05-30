export default class tagSelectController {
  static get UID() {
    return "tagSelectController"
  }

  querySearch(query) {
    var results = query ? this.collection.filter(this.createFilterFor(query)) : [];
    return results;
  }

  createFilterFor(query) {
    var lowercaseQuery = angular.lowercase(query);

    return item => {
      (item._lowername.indexOf(lowercaseQuery) === 0) ||
      (item._lowertype.indexOf(lowercaseQuery) === 0);
    };

  }

  constructor() {
    "ngInject";

    this.selectedItem = null;
    this.searchText = null;

    console.info('collection', this.collection);
  }
}
