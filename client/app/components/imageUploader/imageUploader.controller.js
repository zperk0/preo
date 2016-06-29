export default class imageUploaderController {
  static get UID(){
    return "imageUploaderController"
  }

  fileChange(event){
    let allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    var reader = new FileReader();
    reader.onload = (evt) => {
      if (evt.target.result){
        console.log("evt", evt.target.result);
        var p = this.CroppieService.show(evt.target.result, event)
          .then((img)=>{
            this.ngModel.$setViewValue(img);
          }, ()=>{
            console.log("cancelling img dialog")
          })
      }
    };
    const file = event.currentTarget.files[0];
    if (allowedTypes.indexOf(file.type) === -1 ){
      this.Snack.showError("File extension not supported")
    } else {
      reader.readAsDataURL(file);
    }

  }

  constructor($timeout, CroppieService, Snack) {
    "ngInject";
    this.$timeout = $timeout;
    this.CroppieService = CroppieService;
    this.Snack = Snack;

  }
}
