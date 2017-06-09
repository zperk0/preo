import controller from './externalEventList.controller'

export default function externalEventList(){
  return {
    restrict: 'E',
    template: require("./externalEventList.tpl.html"),
    controller: controller.UID,
    scope:{
      event: "=ngModel",
    },
    controllerAs: "externalEventListCtrl",
    bindToController: true,
    require: ['^form', 'externalEventList'],
    link: (scope, el, attr, ctrls) => {

      ctrls[1].contextualForm = ctrls[0];
    }
  }
}
