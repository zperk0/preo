import controller from './staticModifierChip.controller'

export default function staticModifierChip(){
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
    template: require("./staticModifierChip.tpl.html"),
    controller: controller.UID,
    controllerAs: "staticModifierChipCtrl",
    bindToController: true,
    replace: true,
    require:["^^staticModifierChips","staticModifierChip"],
    link: (scope, el, attr, ctrl) => {
    }
  }
}
