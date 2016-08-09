import controller from './contextualDrawer.outletLocations.controller'

export default function contextualOutletLocations($compile, $timeout, $animate){
  "ngInject";
  return {
    restrict: 'E',
    template: require("./contextualDrawer.outletLocations.tpl.html"),
    controller: controller.UID,
    controllerAs: "drawerOutletLocationsCtrl",
    bindToController: true,
    replace:true,
    link: (scope, el, attr, ctrl) => {
    }
  }
}
