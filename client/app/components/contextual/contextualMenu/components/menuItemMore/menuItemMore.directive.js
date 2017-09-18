import controller from './menuItemMore.controller'

export default function menuItemMore(){
  return {
    restrict: 'E',
    template: require("./menuItemMore.tpl.html"),
    controller: controller.UID,
    scope:{
      item: "=ngModel",
    },
    controllerAs: "menuItemMoreCtrl",
    bindToController: true,
    require:['^form', '^menuItemMore'],
    link: (scope, el, attr, ctrls) => {
      ctrls[1].contextualForm = ctrls[0];

    }
  }
}
