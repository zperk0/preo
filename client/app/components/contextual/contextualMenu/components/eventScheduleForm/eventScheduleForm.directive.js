import controller from './eventScheduleForm.controller'

export default function eventScheduleFormDirective(){
  return {
    restrict: 'E',
    template: require("./eventScheduleForm.tpl.html"),
    controller: controller.UID,
    scope:{
      collectionSlot: "=ngModel",
    },
    controllerAs: "eventScheduleFormCtrl",
    bindToController: true,
    require: ['^form', 'eventScheduleForm'],
    link: (scope, el, attr, ctrls) => {

      ctrls[1].contextualForm = ctrls[0];
    }
  }
}
