import controller from './eventBasic.controller'

export default function eventBasic(){
  return {
    restrict: 'E',
    template: require("./eventBasic.tpl.html"),
    controller: controller.UID,
    scope:{
      event: "=ngModel",
    },
    controllerAs: "eventBasicCtrl",
    bindToController: true,
    require: ['^form', 'eventBasic'],
    link: (scope, el, attr, ctrls) => {

      ctrls[1].contextualForm = ctrls[0];
    }
  }
}
