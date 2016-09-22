export default class collectionSlotAdvancedController {
  static get UID(){
    return "collectionSlotAdvancedController"
  }

  hasObjectError (item) {

    return item && Object.keys(item).length > 0;
  }  

  /* @ngInject */
  constructor($scope) {
    'ngInject';
  }
}
