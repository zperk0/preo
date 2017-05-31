export default class tagSelectController {
  static get UID() {
    return "tagSelectController"
  }

  newTag(name) {
    let tag = this.transformChip(name);
    this.addToCollection(tag);
    this.addToModel(tag);
    this.selectedItem = tag;
  }

  addToModel(tag) {
    if (this.ngModel.indexOf(tag) == -1) {
      this.ngModel.push(tag);
    }
  }

  addToCollection(tag) {
    if (this.collection.indexOf(tag) == -1) {
      this.collection.push(tag);
    }
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

  clearSelection() {
    this.selectedItem = null;
  }

  clearSearchText() {
    this.searchText = null;
  }

  constructor() {
    "ngInject";

    this.clearSelection();
    this.clearSearchText();
    this.ngModel = this.ngModel || [];
    this.collection = this.collection || [];
    this.separatorKeys = [13, 188];
  }
}
