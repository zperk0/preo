import controller from './menuEditor.controller'

export default function menuEditor(){
  'ngInject';
  return {
    restrict: 'E',
    template: require("./menuEditor.tpl.html"),
    scope:{
      menu:"="
    },
    controller: controller.UID,
    controllerAs: "vm",
    bindToController: true,
    replace:true,
    link: (scope, el, attr, ctrl) => {

    }
  }
}
