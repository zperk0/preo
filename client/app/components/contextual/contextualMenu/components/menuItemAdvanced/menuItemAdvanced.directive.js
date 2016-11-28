import controller from './menuItemAdvanced.controller'

export default function menuItemSize(){
  return {
    restrict: 'E',
    template: require("./menuItemAdvanced.tpl.html"),
    controller: controller.UID,
    scope:{
      item: "=ngModel",
    },
    controllerAs: "menuItemAdvancedCtrl",
    bindToController: true,
    require:['menuItemAdvanced', '^contextualMenu'],
    link: (scope, el, attr, ctrls) => {
      ctrls[0].contextualMenuCtrl = ctrls[1];

    }
  }
}
