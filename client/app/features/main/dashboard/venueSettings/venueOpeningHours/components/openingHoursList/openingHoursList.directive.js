import controller from './openingHoursList.controller'

//refactor to not need section
export default function openingHoursList() {
  "ngInject";
  return {
    restrict: 'E',
    scope: {
      openingHours: "=",
      onUpdate: '&'
    },
    template: require("./openingHoursList.tpl.html"),
    controller: controller.UID,
    controllerAs: "openingHoursListCtrl",
    bindToController: true,
    replace:true,
    require: ['^form', 'openingHoursList'],
    link: (scope, element, attrs, ctrls) => {

      ctrls[1].openingHoursForm = ctrls[0];
    }
  }
}
