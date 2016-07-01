export default class menuItemSizeController {
  static get UID(){
    return "menuItemSizeController"
  }

  deleteSize(size){
    console.log("deleting size", size);
    this.ngModel.options = this.ngModel.options.filter((o)=>o.id !== size.id);
  }

  getEmptySize(){
    this.emptyOption.id--;
    return angular.copy(this.emptyOption);
  }

  addSize(){
    this.ngModel.options.push(this.getEmptySize());
  }

  onOptionMoved(){
    this.ngModel.options.forEach((o, index)=>{
      o.position=index*1000;
    });
  }

  /* @ngInject */
  constructor() {
    'ngInject';
    // this.ngModel
    this.emptyOption = {
      id:0
    }
    if (this.ngModel && this.ngModel.length){
      this.isMultiple = true;
    } else {
      this.isMultiple = false;
      this.ngModel = {
        name:"Choose a size",
        options:[
          this.getEmptySize(),
          this.getEmptySize()
        ]
      }
    }


  }
}
