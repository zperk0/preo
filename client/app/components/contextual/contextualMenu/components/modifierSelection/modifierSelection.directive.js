import controller from './modifierSelection.controller'

export default function modifierSelection(){
  return {
    restrict: 'E',
    scope: {
      modifier:"="
    },
    template: require("./modifierSelection.tpl.html"),
    controller: controller.UID,
    controllerAs: "modifierSelectionCtrl",
    bindToController: true,
    require: ['^form', 'modifierSelection'],
    link: (scope, el, attr, ctrls) => {

      ctrls[1].contextualForm = ctrls[0];
    }
  }
}
