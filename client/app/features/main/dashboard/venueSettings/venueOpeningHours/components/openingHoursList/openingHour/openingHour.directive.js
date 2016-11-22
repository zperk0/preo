import controller from './openingHour.controller'

//refactor to not need section
export default function openingHour() {
  "ngInject";
  return {
    restrict: 'E',
    scope: {
      openingHour: "=",
    },
    template: require("./openingHour.tpl.html"),
    controller: controller.UID,
    controllerAs: "openingHourCtrl",
    bindToController: true,
    replace:true,
    link: (scope, element, attrs, ctrl) => {
    }
  }
}
