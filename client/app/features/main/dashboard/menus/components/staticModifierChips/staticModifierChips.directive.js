import controller from './staticModifierChips.controller'

export default function staticModifierChips(){
  "ngInject";
  return {
    restrict: 'E',
    scope: {
      modifiers:"=",
      item:'=?',
      parent:'=?',
      modifierItem:'=?',
      section:'=?',
      onModifierRemoved: '&?'
    },
    template: require("./staticModifierChips.tpl.html"),
    controller: controller.UID,
    controllerAs: "staticModifierChipsCtrl",
    bindToController: true,
    replace:true,
    link: (scope, el, attr, ctrl) => {
    }
  }
}
