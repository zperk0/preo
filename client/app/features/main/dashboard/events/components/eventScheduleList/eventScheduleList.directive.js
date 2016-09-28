import controller from './eventScheduleList.controller'

export default function eventScheduleList(){
  "ngInject";
  return {
    restrict: 'E',
    scope: {
      schedules: "="
    },
    template: require("./eventScheduleList.tpl.html"),
    controller: controller.UID,
    controllerAs: "eventScheduleListCtrl",
    bindToController: true,
    replace:true,
    require: ['^event', 'eventScheduleList'],
    link: (scope, el, attr, ctrls) => {

      ctrls[1].eventCtrl = ctrls[0];
    }
  }
}
