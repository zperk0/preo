export default class cardItemActionsController {
  static get UID(){
    return "cardItemActionsController";
  }

  shouldShowOnAdd () {

  	return typeof this.isAdd === 'undefined' || this.isAdd;
  }

  shouldShowOnAddCustomField () {

  	return typeof this.isAddCustomField === 'undefined' || this.isAddCustomField;
  }

  constructor($scope, gettextCatalog) {
    'ngInject';
    this.visibleMessage =  this.visibleMessage || gettextCatalog.getString('Hide from menu');
    this.invisibleMessage = this.invisibleMessage || gettextCatalog.getString('Show on menu');
  }
}
