import controller from './eventScheduleList.controller'

export default function eventScheduleList($timeout){
  "ngInject";
  return {
    restrict: 'E',
    scope: {
      schedules: "=",
      event: '=',
      hasNew:"=",
    },
    template: require("./eventScheduleList.tpl.html"),
    controller: controller.UID,
    controllerAs: "eventScheduleListCtrl",
    bindToController: true,
    replace: true,
    require: ['^event', '^eventScheduleList'],
    link: (scope, el, attr, ctrls) => {

      let eventCtrl = ctrls[0];
      let eventScheduleListCtrl = ctrls[1];

      eventScheduleListCtrl.eventCtrl = eventCtrl;
    }
  }
}
