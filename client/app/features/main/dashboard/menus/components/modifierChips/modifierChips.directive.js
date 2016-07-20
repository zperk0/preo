import controller from './modifierChips.controller'

export default function modifierChips(){
  "ngInject";
  return {
    restrict: 'E',
    scope: {
      modifiers:"=",
      item:'=?',
      parent:'=?',
      modifierItem:'=?',
      section:'=?',
    },
    template: require("./modifierChips.tpl.html"),
    controller: controller.UID,
    controllerAs: "vm",
    bindToController: true,
    replace:true,
    link: (scope, el, attr, ctrl) => {
    }
  }
}
