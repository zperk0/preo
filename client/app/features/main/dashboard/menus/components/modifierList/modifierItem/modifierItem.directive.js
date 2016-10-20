import controller from './modifierItem.controller'

export default function modifierItem(){
  return {
    restrict: 'E',
    scope: {
      modifier:"="
    },
    template: require("./modifierItem.tpl.html"),
    controller: controller.UID,
    controllerAs: "modifierItemCtrl",
    bindToController: true,
    require:['^?cardItemList','modifierItem'],
    link: (scope, el, attr, ctrl) => {
      ctrl[1].cardItemList = ctrl[0];
      scope.$index = scope.$parent.$index;
    }
  }
}
