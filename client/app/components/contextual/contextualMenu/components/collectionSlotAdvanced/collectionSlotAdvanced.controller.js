export default class collectionSlotAdvancedController {
  static get UID(){
    return "collectionSlotAdvancedController"
  }

  hasObjectError (item) {

    return item && Object.keys(item).length > 0;
  }  

  getStartFactor () {
    
    return this.collectionSlot.start < 0 || this.collectionSlot.start == null ? -1 : 1;    
  }  

  /* @ngInject */
  constructor($scope) {
    'ngInject';

    this.collectionSlot.$startFactor = this.getStartFactor();

    this.collectionSlot.$start = this.collectionSlot.start != null ? Math.abs(this.collectionSlot.start) : '';
    this.collectionSlot.$hasSteps = !isNaN(parseInt(this.collectionSlot.step));
  }
}
