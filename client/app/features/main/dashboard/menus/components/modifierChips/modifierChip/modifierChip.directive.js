import controller from './modifierChip.controller'

export default function modifierChip(){
  "ngInject";
  return {
    restrict: 'E',
    scope: {
      modifier:"=",
      item:"=?",
      parent:"=?",
      modifierItem:"=?",
      section:'=?',
      onModifierRemoved: '&?'
    },
    template: require("./modifierChip.tpl.html"),
    controller: controller.UID,
    controllerAs: "modifierChipCtrl",
    bindToController: true,
    require:["^^modifierChips","modifierChip"],
    link: (scope, el, attr, ctrl) => {
    }
  }
}
