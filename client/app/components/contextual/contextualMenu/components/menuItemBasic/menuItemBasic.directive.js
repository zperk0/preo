import controller from './menuItemBasic.controller'

export default function menuItemBasic(){
  return {
    restrict: 'E',
    template: require("./menuItemBasic.tpl.html"),
    controller: controller.UID,
    scope:{
      item: "=ngModel",
    },
    controllerAs: "menuItemBasicCtrl",
    bindToController: true,
    require:['^form', 'menuItemBasic', '^contextualMenu'],
    link: (scope, el, attr, ctrls) => {
      ctrls[1].contextualMenuCtrl = ctrls[2];
      ctrls[1].contextualForm = ctrls[0];

    }
  }
}
