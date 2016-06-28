export default class imageUploaderController {
  static get UID(){
    return "imageUploaderController"
  }

  fileChange(event){
    var reader = new FileReader();
    reader.onload = (evt) => {
      if (evt.target.result){
        var p = this.CroppieService.show(evt.target.result, event)
          .then((img)=>{
            this.ngModel.$setViewValue(img);
          }, ()=>{
            console.log("cancelling img dialog")
          })
      }
    };
    reader.readAsDataURL(event.currentTarget.files[0]);
  }

  constructor($timeout, CroppieService) {
    "ngInject";
    this.$timeout = $timeout;
    this.CroppieService = CroppieService;

  }
}
