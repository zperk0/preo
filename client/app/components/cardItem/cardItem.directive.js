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
      deleted:"=?",
      expanded:"=?"
    },
    controllerAs: "vm",
    bindToController: true,
    transclude:true,
    replace:true,
    require:["^?cardItemList","cardItem"],
    link: (scope, el, attr, ctrl) => {
      ctrl[1].list = ctrl[0];

    }
  }
}
