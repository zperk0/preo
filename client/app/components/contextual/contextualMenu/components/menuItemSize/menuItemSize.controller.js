export default class menuItemSizeController {
  static get UID(){
    return "menuItemSizeController"
  }


  deleteSize(size){
    this.ngModel.$deletedItems = this.ngModel.$deletedItems.concat(this.ngModel.items.filter((o)=> o == size));
    this.ngModel.items = this.ngModel.items.filter((o)=>o != size);
  }

  getEmptySize(){
    let opt = {
      visible:1
    }
    opt.position = this.ngModel.items.length * 1000;
    return opt;
  }

  addSize(){
    this.ngModel.items.push(this.getEmptySize());
  }

  onOptionMoved(){
    this.ngModel.items.forEach((o, index)=>{
      o.position=index*1000;
    });
  }

  onSizeSelect(){
    console.log("size selected", arguments, this.ngModel.$isMultiple)
    if (this.ngModel.$isMultiple && !this.ngModel.items.length){
      this.$timeout(()=>{
        this.ngModel = {
          $deletedItems :[],
          $isMultiple:true,
          position:0,
          variant:1,
          maxChoices: 1,
          minChoices: 1,
          venueId: this.StateService.venue.id,
          name:"Choose a size",
          internalName:"Choose a size",
          items:[
          ]
        }
        this.ngModel.items.push(this.getEmptySize());
        this.ngModel.items.push(this.getEmptySize());
      })
    }
  }

  hasNestedModifierFeature () {

    return this.FeatureService.hasNestedModifierFeature();
  }

  /* @ngInject */
  constructor($scope, $stateParams, $timeout, FeatureService, StateService) {
    'ngInject';
    this.$stateParams = $stateParams;
    this.$timeout = $timeout;
    this.FeatureService = FeatureService;
    this.StateService = StateService;

    if (this.ngModel && this.ngModel.id){
      this.ngModel.$isMultiple = true;
      this.ngModel.$deletedItems = [];
    } else {
      this.ngModel = {
        $isMultiple:false,
        venueId: StateService.venue && StateService.venue.id,
        items:[]
      }
    }

    if (this.ngModel.$isMultiple && this.item.isVoucher()) {
      this.ngModel.$isMultiple = false;
    }
  }
}
