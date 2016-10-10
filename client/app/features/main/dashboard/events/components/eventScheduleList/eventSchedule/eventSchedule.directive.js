import controller from './eventSchedule.controller'

export default function eventSchedule(){
  return {
    restrict: 'E',
    scope: {
        schedule: '=',
        hasActions: '=?'
    },
    template: require("./eventSchedule.tpl.html"),
    controller: controller.UID,
    controllerAs: "scheduleCtrl",
    replace: true,
    bindToController: true,
    require:["^cardItemList", "^eventScheduleList", "eventSchedule"],
    link: (scope, el, attr, ctrls) => {

      ctrls[2].cardItemList = ctrls[0];
      ctrls[2].eventScheduleListCtrl = ctrls[1];
    }
  }
}
