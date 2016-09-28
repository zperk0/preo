export default class collectionSlotsSelectController {
  static get UID(){
    return "collectionSlotsSelectController"
  }

  getCollectionSlots () {

    return this.data.collectionSlots;
  }

  constructor($stateParams, MenuService) {
    "ngInject";
    
    this.data = {
      collectionSlots: [{
        id: 1,
        name: 'test'
      }, {
        id: 2,
        name: 'test 2'
      }, {
        id: 3,
        name: 'test 3'
      }]
    };
    this.$stateParams = $stateParams;
  }
}
