import controller from './menuItemSize.controller'

export default function menuItemSize(){
  return {
    restrict: 'E',
    template: require("./menuItemSize.tpl.html"),
    controller: controller.UID,
    scope:{
      ngModel:"=",
      ngPriceModel:"=",
    },
    controllerAs: "menuItemSizeCtrl",
    bindToController: true,
    require:['menuItemSize', '^contextualMenu'],
    link: (scope, el, attr, ctrls) => {
      ctrls[0].contextualMenuCtrl = ctrls[1];

    }
  }
}
