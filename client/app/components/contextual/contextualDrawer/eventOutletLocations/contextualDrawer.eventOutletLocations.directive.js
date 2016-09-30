import controller from './contextualDrawer.eventOutletLocations.controller'

export default function contextualEventOutletLocations($compile, $timeout, $animate){
  "ngInject";
  return {
    restrict: 'E',
    template: require("./contextualDrawer.eventOutletLocations.tpl.html"),
    controller: controller.UID,
    controllerAs: "drawerEventOutletLocationsCtrl",
    bindToController: true,
    replace:true,
    link: (scope, el, attr, ctrl) => {
    }
  }
}
