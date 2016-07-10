import controller from './modifierSelection.controller'

export default function modifierSelection(){
  return {
    restrict: 'E',
    scope: {
      modifier:"="
    },
    template: require("./modifierSelection.tpl.html"),
    controller: controller.UID,
    controllerAs: "vm",
    bindToController: true,
    link: (scope, el, attr, ctrl) => {

    }
  }
}
