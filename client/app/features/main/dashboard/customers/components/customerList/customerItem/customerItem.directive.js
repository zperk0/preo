
import controller from './customerItem.controller'

export default function customerItem(){
  "ngInject";
  return {
    restrict: 'E',
    scope: {
      customer: '=',
      onEdit: '&?',
      onNotes: '&?',
      onPlaceOrder: '&?',
    },
    template: require("./customerItem.tpl.html"),
    controller: controller.UID,
    controllerAs: "$customer",
    replace: true,
    bindToController: true,
    require:["^cardItemList", "^customerList", "customerItem"],
    link: (scope, el, attr, ctrls) => {

      ctrls[2].cardItemList = ctrls[0];
      ctrls[2].customerListCtrl = ctrls[1];
    }
  }
}
