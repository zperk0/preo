import controller from './publishVenues.controller'

export default function publishVenues() {
  "ngInject";
  return {
    restrict: 'E',
    scope: {},
    template: require("./publishVenues.tpl.html"),
    controller: controller.UID,
    controllerAs: "$publishVenues",
    bindToController: true,
    link: (scope, el, attr, ctrl) => {

    }
  }
}
