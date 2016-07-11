import controller from './cardItemChildren.controller'

export default function cardItemChildren(){
  return {
    restrict: 'E',
    scope: {
      options:"="
    },
    template: require("./cardItemChildren.tpl.html"),
    controller: controller.UID,
    controllerAs: "vm",
    bindToController: true,
    link: (scope, el, attr, ctrl) => {

    }
  }
}
