export default class imageUploaderController {
  static get UID(){
    return "imageUploaderController"
  }
  target(){
    this.el[0].querySelector(".imagefile").click();
  }

  deleteImage($event){
    //if it's a tmp image delete it, otherwise mark it to be deleted when DONE is clicked
      if (this.ngModel[0].$save){
        if (this.ngModel.length && this.ngModel[0].image){
          this.ngModel[0].$image = this.UtilsService.getImagePath(this.ngModel[0].image);
        } else {
          delete this.ngModel[0].$image;
        }
        this.ngModel[0].$save = false;
        this.ngModel[0].$delete = false;
      } else {
        this.ngModel[0].$delete = true;
        delete this.ngModel[0].$image;
      }
    angular.element(this.el[0].querySelector(".image-wrapper.not-found")).removeClass("not-found");
    $event.stopPropagation();
  }

  fileChange(event){
    let allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    var reader = new FileReader();
    reader.onload = (evt) => {
      if (evt.target.result){
        var p = this.CroppieService.show(evt.target.result, event)
          .then((img)=>{
            if (this.ngModel.length){
              this.ngModel[0].$image = img;
            } else {
              this.ngModel[0] = {
                $image:img
              }
            }
            this.ngModel[0].$delete = false;
            this.ngModel[0].$save = true;
            angular.element(this.el[0].querySelector(".image-wrapper.not-found")).removeClass("not-found");
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

  getImage(){
    console.log("have image", this.ngModel[0].$image)
    return this.ngModel[0].$image;
  }

  onDestroy(){
    if (this.ngModel && this.ngModel.length && this.ngModel[0]){
      delete this.ngModel[0].$save;
      delete this.ngModel[0].$delete;
      delete this.ngModel[0].$image;
    }
  }

  constructor($timeout, CroppieService, DialogService, LabelService, UtilsService, Snack) {
    "ngInject";
    this.DialogService = DialogService;
    this.UtilsService = UtilsService;
    this.$timeout = $timeout;
    this.CroppieService = CroppieService;
    this.Snack = Snack;
    console.log("constrcut")
    if (this.ngModel && this.ngModel.length && !this.ngModel[0].$image && this.ngModel[0].image){
      this.ngModel[0].$image = this.UtilsService.getImagePath(this.ngModel[0].image);
      console.log("have length", this.ngModel[0].$image)
    }

  }
}
