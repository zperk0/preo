export default class collectionSlotBasicController {
  static get UID(){
    return "collectionSlotBasicController"
  }

  hasObjectError (item) {

    return item && Object.keys(item).length > 0;
  }  

  /* @ngInject */
  constructor($scope) {
    'ngInject';
  }
}
