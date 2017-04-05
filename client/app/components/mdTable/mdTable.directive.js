import controller from './mdTable.controller'

export default function mdTable(){
  'ngInject';
  return {
    restrict: 'E',
    scope:{
      data: '='
    },
    template: require("./mdTable.tpl.html"),
    controller: controller.UID,
    controllerAs: "vm",
    bindToController: true,
   // replace:true,
    link: (scope, el, attr, ctrl) => {
    }
  }
}
