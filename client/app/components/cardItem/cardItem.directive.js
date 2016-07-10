import controller from './cardItem.controller'

export default function cardItem(){
  "ngInject";
  return {
    restrict: 'E',
    template: require("./cardItem.tpl.html"),
    controller: controller.UID,
    scope:{
      hasActions:"=?",
      item:"=",
      selected:"=?",
      expanded:"=?"
    },
    controllerAs: "vm",
    bindToController: true,
    transclude:true,
    replace:true,
    link: (scope, el, attr, ctrl) => {

    }
  }
}
