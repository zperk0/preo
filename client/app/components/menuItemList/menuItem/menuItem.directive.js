import controller from './menuItem.controller';

export default function menuItem(){
  "ngInject";
  return {
    restrict: 'E',
    scope: {
      item:"=?",
      section:"=?"
    },
    template: require("./menuItem.tpl.html"),
    controller: controller.UID,
    controllerAs: "vm",
    bindToController: true,
    // replace:true,
    require:["^menuItemList", "menuItem"],
    link: (scope, el, attr, ctrls) => {
      ctrls[1].menuItemListCtrl = ctrls[0]
    }
  };
}
