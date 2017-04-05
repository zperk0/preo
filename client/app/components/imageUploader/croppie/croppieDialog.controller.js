export default class CroppieDialogController {
  static get UID(){
    return "CroppieDialogController"
  }

  onUpdate(img){
    this.outputImg = img;
  }

  cancel(){
    this.$mdDialog.cancel();
  }

  confirm(){
    this.$mdDialog.hide(this.outputImg);
  }

  constructor($mdDialog) {
    'ngInject';
    this.outputImg = false;
    this.output = this.output || false;
    this.$mdDialog = $mdDialog;

  }
}
