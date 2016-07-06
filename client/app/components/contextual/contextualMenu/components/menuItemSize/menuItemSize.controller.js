export default class menuItemSizeController {
  static get UID(){
    return "menuItemSizeController"
  }


  deleteSize(size){
    this.ngModel.$deletedItems = this.ngModel.$deletedItems.concat(this.ngModel.items.filter((o)=>o.id === size.id));
    this.ngModel.items = this.ngModel.items.filter((o)=>o.id !== size.id);
  }

  getEmptySize(){
    let opt = angular.copy(this.emptyOption);
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

  /* @ngInject */
  constructor($scope, $stateParams) {
    'ngInject';
    // this.ngModel
    this.emptyOption = {
      visible:1
    }
    if (this.ngModel && this.ngModel.id){
      this.ngModel.$isMultiple = true;
      this.ngModel.$deletedItems = [];
    } else {
      this.ngModel = {
        $deletedItems :[],
        $isMultiple:false,
        position:0,
        variant:1,
        venueId:$stateParams.venueId,
        name:"Choose a size",
        items:[
        ]
      }
      this.ngModel.items.push(this.getEmptySize());
      this.ngModel.items.push(this.getEmptySize());
    }
  }
}
