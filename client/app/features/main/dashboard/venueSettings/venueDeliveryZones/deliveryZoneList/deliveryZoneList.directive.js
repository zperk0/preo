import controller from './deliveryZoneList.controller'

//refactor to not need section
export default function deliveryZoneList($animate, $timeout, $document, $rootScope){
  "ngInject";
  return {
    restrict: 'E',
    scope: {
      deliveryZones:"=",
    },
    template: require("./deliveryZoneList.tpl.html"),
    controller: controller.UID,
    controllerAs: "deliveryZoneListCtrl",
    bindToController: true,
    replace:true,
    link: (scope, element, attrs, ctrl) => {
    }
  }
}
