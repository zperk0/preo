import controller from './menuItem.controller';

export default function menuItem(){
  "ngInject";
  return {
    restrict: 'E',
    scope: {
      item:"=",
      sectionId:"=?"
    },
    template: require("./menuItem.tpl.html"),
    controller: controller.UID,
    controllerAs: "vm",
    bindToController: true,
    replace:true,
    require:["^cardItemList", "^menuItemList", "menuItem"],
    link: (scope, el, attr, ctrls) => {
      ctrls[2].menuItemListCtrl = ctrls[1]
      ctrls[2].cardItemList = ctrls[0]
    }
  };
}
