import controller from './deliveryZone.controller';

export default function deliveryZone($timeout){
  "ngInject";
  return {
    restrict: 'E',
    scope: {
      deliveryZone:"=",
      onItemCreated:"&?",
      onItemDeleted:"&?",
      onItemUpdated:"&?",
      onClone:"&?",
    },
    template: require("./deliveryZone.tpl.html"),
    controller: controller.UID,
    controllerAs: "deliveryZoneCtrl",
    bindToController: true,
    replace:true,
    require:["^cardItemList", "?^deliveryZoneList", "deliveryZone"],
    link: (scope, el, attr, ctrls) => {
      ctrls[2].cardItemList = ctrls[0];

      if (ctrls[1]) {
        ctrls[2].deliveryZoneList = ctrls[1];
      }
    }
  };
}
