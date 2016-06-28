export default class CroppieDialogController {
  static get UID(){
    return "CroppieDialogController"
  }

  onUpdate(img){
    this.output = img;
  }

  cancel(){
    this.$mdDialog.cancel();
  }

  confirm(){
    this.$mdDialog.hide(this.output);
  }

  constructor($mdDialog) {
    'ngInject';
    this.output = false;
    this.$mdDialog = $mdDialog;

  }
}
