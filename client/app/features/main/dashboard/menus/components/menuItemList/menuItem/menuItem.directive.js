import controller from './menuItem.controller';

export default function menuItem($timeout){
  "ngInject";
  return {
    restrict: 'E',
    scope: {
      item:"=",
      sectionId:"=?",
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
    require:["^cardItemList", "^menuItemList", "menuItem"],
    link: (scope, el, attr, ctrls) => {
      ctrls[2].menuItemListCtrl = ctrls[1]
      ctrls[2].cardItemList = ctrls[0]

    }
  };
}
