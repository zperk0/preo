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
    if (!this.checkExists(tag, this.ngModel)) {
      this.ngModel.push(tag);
    }
  }

  addToCollection(tag) {
    if (!this.checkExists(tag, this.collection)) {
      this.collection.push(tag);
    }
  }

  checkExists(tag, array) {
    let filter = array.filter(item => {
      if (tag.id) {
        return item.id == tag.id;
      } else {
        return item.name == tag.name;
      }
    });
    return filter.length > 0 ? filter[0] : false;
  }

  transformChip(chip) {
    if (angular.isObject(chip)) {
      if (this.checkExists(chip, this.ngModel)) {
        return null;
      }
      return chip;
    }

    let tag = {
      name: chip,
      venueId: this.StateService.venue.id
    };

    let existentTag = this.checkExists(tag, this.collection);
    if (existentTag) {
      tag = existentTag;
    }

    return tag;
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

  constructor(StateService) {
    "ngInject";

    this.StateService = StateService;

    this.clearSelection();
    this.clearSearchText();
    this.ngModel = this.ngModel || [];
    this.collection = this.collection || [];
    this.separatorKeys = [13, 188];
  }
}
