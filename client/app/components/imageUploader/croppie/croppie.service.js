import controller from './croppieDialog.controller';

export default class CroppieService {

  static get UID(){
    return "CroppieService"
  }

  show(src, boundry, vp, output){
    if (!boundry){
      boundry= {w: 700, h:500};
    }
    if (!vp){
      vp={w: 590, h:393};
    }

    return this.$mdDialog.show({
      controller: controller,
      template: require('./croppieDialog.tpl.html'),
      clickOutsideToClose:true,
      bindToController:true,
      controllerAs:'vm',
      locals:{
        src:src,
        boundry:boundry,
        output:output,
        vp:vp
      }
    });
  }

  constructor($mdDialog) {
    "ngInject";
    this.$mdDialog = $mdDialog;

  }
}