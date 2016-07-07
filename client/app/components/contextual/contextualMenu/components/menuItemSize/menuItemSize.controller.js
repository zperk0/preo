export default class menuItemSizeController {
  static get UID(){
    return "menuItemSizeController"
  }


  deleteSize(size){
    this.ngModel.$deletedItems = this.ngModel.$deletedItems.concat(this.ngModel.items.filter((o)=> o == size));
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

  onSizeSelect(){
    console.log("size selected", arguments, this.ngModel.$isMultiple)
    if (this.ngModel.$isMultiple && !this.ngModel.items.length){
      this.$timeout(()=>{
        this.ngModel = {
          $deletedItems :[],
          $isMultiple:true,
          position:0,
          variant:1,
          venueId:this.$stateParams.venueId,
          name:"Choose a size",
          items:[
          ]
        }
        this.ngModel.items.push(this.getEmptySize());
        this.ngModel.items.push(this.getEmptySize());
      })
    }
  }

  /* @ngInject */
  constructor($scope, $stateParams, $timeout) {
    'ngInject';
    this.$stateParams = $stateParams;
    this.$timeout = $timeout;
    this.emptyOption = {
      visible:1
    }
    if (this.ngModel && this.ngModel.id){
      this.ngModel.$isMultiple = true;
      this.ngModel.$deletedItems = [];
    } else {
      this.ngModel = {
        $isMultiple:false,
        items:[]
      }
    }
  }
}
