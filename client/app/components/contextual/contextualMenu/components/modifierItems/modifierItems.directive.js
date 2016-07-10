import controller from './modifierItems.controller'

export default function modifierItems(){
  return {
    restrict: 'E',
    scope: {
      modifier:"="
    },
    template: require("./modifierItems.tpl.html"),
    controller: controller.UID,
    controllerAs: "vm",
    bindToController: true,
    link: (scope, el, attr, ctrl) => {

    }
  }
}
