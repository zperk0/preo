export default class collectionSlotBasicController {
  static get UID(){
    return "collectionSlotBasicController"
  }

  hasObjectError (item) {

    return item && Object.keys(item).length > 0;
  }  

  getEndFactor () {

    return this.collectionSlot.end < 0 || this.collectionSlot.end == null ? -1 : 1;
  }

  /* @ngInject */
  constructor($scope) {
    'ngInject';

    this.collectionSlot.$endFactor = this.getEndFactor();

    this.collectionSlot.$end = this.collectionSlot.end != null ? Math.abs(this.collectionSlot.end) : '';
  }
}
