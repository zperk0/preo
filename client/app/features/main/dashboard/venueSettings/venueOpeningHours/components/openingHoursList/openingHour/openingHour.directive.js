import controller from './openingHour.controller'

//refactor to not need section
export default function openingHour() {
  "ngInject";
  return {
    restrict: 'E',
    scope: {
      openingHour: "=",
      showRemove: '=',
      index: '='
    },
    template: require("./openingHour.tpl.html"),
    controller: controller.UID,
    controllerAs: "openingHourCtrl",
    bindToController: true,
    replace:true,
    require: ['^form', 'openingHour'],
    link: (scope, element, attrs, ctrls) => {

      ctrls[1].openingHoursForm = ctrls[0];
    }
  }
}
