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
    require:["^cardItemList", "menuItem"],
    link: (scope, el, attr, ctrls) => {
      ctrls[1].cardItemList = ctrls[0];
    }
  };
}
