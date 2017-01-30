import controller from './staticModifierItem.controller'

export default function staticModifierItem(){
  return {
    restrict: 'E',
    scope: {
      modifier:"="
    },
    template: require("./staticModifierItem.tpl.html"),
    controller: controller.UID,
    controllerAs: "staticModifierItemCtrl",
    bindToController: true,
    require:['^?cardItemList','staticModifierItem'],
    link: (scope, el, attr, ctrl) => {
      ctrl[1].cardItemList = ctrl[0];
      scope.$index = scope.$parent.$index;
    }
  }
}
