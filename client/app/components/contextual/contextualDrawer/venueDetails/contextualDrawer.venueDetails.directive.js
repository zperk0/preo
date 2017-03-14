import controller from './contextualDrawer.venueDetails.controller'

export default function contextualOutlets($compile, $timeout, $animate){
  "ngInject";
  return {
    restrict: 'E',
    template: require("./contextualDrawer.venueDetails.tpl.html"),
    controller: controller.UID,
    controllerAs: "drawerVenueDetailsCtrl",
    bindToController: true,
    replace:true,
    transclude: true,
    link: (scope, el, attr, ctrl) => {
    }
  }
}
