import controller from './menuItemAdvanced.controller'

export default function menuItemAdvanced(){
  return {
    restrict: 'E',
    template: require("./menuItemAdvanced.tpl.html"),
    controller: controller.UID,
    scope:{
      item: "=ngModel",
    },
    controllerAs: "menuItemAdvancedCtrl",
    bindToController: true,
    require:['^form', '^menuItemAdvanced'],
    link: (scope, el, attr, ctrls) => {
      ctrls[1].contextualForm = ctrls[0];

    }
  }
}
