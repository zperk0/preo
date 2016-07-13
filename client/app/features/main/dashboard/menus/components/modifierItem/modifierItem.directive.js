import controller from './modifierItem.controller'

export default function modifierItem(){
  return {
    restrict: 'E',
    scope: {
      modifier:"="
    },
    template: require("./modifierItem.tpl.html"),
    controller: controller.UID,
    controllerAs: "vm",
    bindToController: true,
    require:['^?cardItemList','modifierItem'],
    link: (scope, el, attr, ctrl) => {
      ctrl[1].list = ctrl[0];
    }
  }
}
