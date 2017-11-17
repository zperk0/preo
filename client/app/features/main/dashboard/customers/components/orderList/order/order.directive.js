import controller from './order.controller'

export default function order(){
  "ngInject";
  return {
    restrict: 'E',
    scope: {
      order: '='
    },
    template: require("./order.tpl.html"),
    controller: controller.UID,
    controllerAs: "orderCtrl",
    replace: true,
    bindToController: true
  }
}
