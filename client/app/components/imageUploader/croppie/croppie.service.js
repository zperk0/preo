import controller from './croppieDialog.controller';

export default class CroppieService {

  static get UID(){
    return "CroppieService"
  }

  show(src){
    return this.$mdDialog.show({
      controller: controller,
      template: require('./croppieDialog.tpl.html'),
      clickOutsideToClose:true,
      bindToController:true,
      controllerAs:'vm',
      locals:{
        src:src
      }
    });
  }

  constructor($mdDialog) {
    "ngInject";
    this.$mdDialog = $mdDialog;

  }
}