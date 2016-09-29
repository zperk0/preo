import controller from './eventScheduleList.controller'

export default function eventScheduleList($timeout){
  "ngInject";
  return {
    restrict: 'E',
    scope: {
      schedules: "=",
      event: '='
    },
    template: require("./eventScheduleList.tpl.html"),
    controller: controller.UID,
    controllerAs: "eventScheduleListCtrl",
    bindToController: true,
    replace: true,
    link: (scope, el, attr, ctrl) => {

      ctrl.el = el;
      el[0].style.maxHeight = 0;
      el.on('webkitTransitionEnd transitionend oTransitionEnd webkitTransitionEnd',(e)=>{
        if (e.propertyName === 'max-height'){
          $timeout(()=>{
            ctrl.event.$expanding = false;
          })
        }
      })      
    }
  }
}
