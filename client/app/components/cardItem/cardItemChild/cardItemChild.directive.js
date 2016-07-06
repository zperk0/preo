import controller from './cardItemChild.controller'

export default function cardItemChild(){
  return {
    restrict: 'E',
    scope: {
      size:"=",
    },
    template: require("./cardItemChild.tpl.html"),
    controller: controller.UID,
    controllerAs: "vm",
    bindToController: true,
    replace:true,
    link: (scope, el, attr, ctrl) => {

    }
  }
}