import controller from './contextualDrawer.deliveryZonesEdit.controller'

export default function contextualOutlets($compile, $timeout, $animate){
  "ngInject";
  return {
    restrict: 'E',
    template: require("./contextualDrawer.deliveryZonesEdit.tpl.html"),
    controller: controller.UID,
    controllerAs: "drawerDeliveryZonesEditCtrl",
    bindToController: true,
    replace:true,
    link: (scope, el, attr, ctrl) => {
    }
  }
}
