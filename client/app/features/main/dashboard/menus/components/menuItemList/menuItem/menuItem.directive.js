import controller from './menuItem.controller';

export default function menuItem($timeout){
  "ngInject";
  return {
    restrict: 'E',
    scope: {
      item:"=",
      section:"=?",
      hasActions: '=?',
      onItemCreated:"&?",
      onItemDeleted:"&?",
      onItemUpdated:"&?",
      onClone:"&?",
    },
    template: require("./menuItem.tpl.html"),
    controller: controller.UID,
    controllerAs: "menuItemCtrl",
    bindToController: true,
    replace:true,
    require:["^cardItemList", "?^menuSectionItemList", "menuItem"],
    link: (scope, el, attr, ctrls) => {
      ctrls[2].cardItemList = ctrls[0];

      if (ctrls[1]) {
        ctrls[2].menuSectionItemList = ctrls[1];
      }
    }
  };
}
