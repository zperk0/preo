import controller from './openingHoursList.controller'

//refactor to not need section
export default function openingHoursList() {
  "ngInject";
  return {
    restrict: 'E',
    scope: {
      openingHours: "=",
    },
    template: require("./openingHoursList.tpl.html"),
    controller: controller.UID,
    controllerAs: "openingHoursListCtrl",
    bindToController: true,
    replace:true,
    link: (scope, element, attrs, ctrl) => {
    }
  }
}
