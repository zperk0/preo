import controller from './contextualDrawer.deliveryZones.controller'

export default function contextualOutlets($compile, $timeout, $animate){
  "ngInject";
  return {
    restrict: 'E',
    template: require("./contextualDrawer.deliveryZones.tpl.html"),
    controller: controller.UID,
    controllerAs: "drawerDeliveryZonesCtrl",
    bindToController: true,
    replace:true,
    link: (scope, el, attr, ctrl) => {
    }
  }
}
