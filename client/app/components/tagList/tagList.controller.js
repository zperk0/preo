export default class tagListController {
  static get UID(){
    return "tagListController"
  }

  setModels(){
    this.tags.forEach((tag)=>{
      tag.$model = this.ngModel.$viewValue.filter((t)=>{return t.code===tag.code}).length > 0;
    })
  }
  onChange(tag){
    console.log("got tag" ,tag);
    if (!tag.$model){
      this.ngModel.$viewValue.push(tag)
    } else {
      this.ngModel.$viewValue = this.ngModel.$viewValue.filter((t)=>{return t.code !== tag.code});
    }

  }

  /* @ngInject */
  constructor() {
    'ngInject';
    this.tags = Preoday.Tag.getAll()
  }
}
