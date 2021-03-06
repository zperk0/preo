export default class imageUploaderController {
  static get UID(){
    return "imageUploaderController"
  }
  target(){
    this.$timeout(() => {
      this.el[0].querySelector(".imagefile").click();
    });
  }

  callOnChange(){
    console.log("calling on change", this.onChange)
    if (this.onChange){
      this.onChange({image:this.ngModel[0]});
    }
  }

  deleteImage($event){

    if (this.ngDisabled) {
      return;
    }

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
        console.log("before on delete", this.onDelete, this.ngModel)
        if (this.onDelete && this.ngModel[0].id) {
          this.onDelete({
            image: this.ngModel[0]
          });
        } else {
          this.ngModel[0].$delete = true;
          delete this.ngModel[0].$image;
        }
      }
    this.callOnChange();
    angular.element(this.el[0].querySelector(".image-wrapper.not-found")).removeClass("not-found");
    $event.stopPropagation();
  }

  onImageCropped (img) {

    if (this.ngModel.length){
      this.ngModel[0].$image = img;
    } else {
      this.ngModel[0] = {
        $image:img
      }
    }
    this.ngModel[0].$delete = false;
    this.ngModel[0].$save = true;
    this.callOnChange();

    this.onAdd && this.onAdd({
      image: this.ngModel[0]
    });
    angular.element(this.el[0].querySelector(".image-wrapper.not-found")).removeClass("not-found");
  }

  fileChange(event){
    console.log("on file change");
    let allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    var reader = new FileReader();
    reader.onload = (evt) => {
      console.log("got result - loading dialog");
      if (evt.target.result){

        if (this.dimensions) {
          var p = this.CroppieService.show(evt.target.result,this.boundry, this.viewport, this.output)
          .then((img)=>{
            console.log("uploading img dialog", this.ngModel);
            this.onImageCropped(img);
          }, ()=>{
            console.log("cancelling img dialog")
          })
        } else {
          this.$timeout(() => {

            this.onImageCropped(evt.target.result);
          });
        }
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

    if (this.ngModel && this.ngModel.length && this.ngModel[0] && !this.keepOnDestroy){
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
    this.$timeout = $timeout;

    if(!this.maxSize)
      this.maxSize = '5mb';
    
    if(!this.fileTypes)
      this.fileTypes = 'jpg, png';

    console.log("constrcut", this.ngModel)
    if (this.ngModel && this.ngModel.length && !this.ngModel[0].$image && (this.ngModel[0].image || this.ngModel[0].src)) {
      this.ngModel[0].$image = this.UtilsService.getImagePath(this.ngModel[0].image || this.ngModel[0].src);
      console.log("have length", this.ngModel[0].$image)
    }

  }
}
