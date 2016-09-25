import controller from './eventScheduleForm.controller'

export default function eventScheduleFormDirective(){
  return {
    restrict: 'E',
    template: require("./eventScheduleForm.tpl.html"),
    controller: controller.UID,
    scope:{
      schedule: "=ngModel",
    },
    controllerAs: "eventScheduleFormCtrl",
    bindToController: true,
    require: ['^form', '^contextualMenu', 'eventScheduleForm'],
    link: (scope, el, attr, ctrls) => {

      ctrls[2].contextualForm = ctrls[0];
      ctrls[2].contextualMenuCtrl = ctrls[1];
    }
  }
}
