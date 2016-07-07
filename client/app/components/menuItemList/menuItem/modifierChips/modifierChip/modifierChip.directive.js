import controller from './modifierChip.controller'

export default function modifierChip(){
  "ngInject";
  return {
    restrict: 'E',
    scope: {
      modifier:"=",
    },
    template: require("./modifierChip.tpl.html"),
    controller: controller.UID,
    controllerAs: "vm",
    bindToController: true,
    require:["^^modifierChips","modifierChip"],
    link: (scope, el, attr, ctrl) => {

    }
  }
}
