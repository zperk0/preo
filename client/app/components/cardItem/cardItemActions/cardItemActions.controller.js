export default class cardItemActionsController {
  static get UID(){
    return "cardItemActionsController";
  }

  constructor($scope, gettextCatalog) {
    'ngInject';
    this.visibleMessage =  this.visibleMessage || gettextCatalog.getString('Hide from menu');
    this.invisibleMessage = this.invisibleMessage || gettextCatalog.getString('Show on menu');
  }
}
