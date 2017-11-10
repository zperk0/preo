import controller from './taxRate.controller'

export default function taxRate(){
    "ngInject";
  return {
    restrict: 'E',
    scope: {
        taxRate:"="
    },
    template: require("./taxRate.tpl.html"),
    controller: controller.UID,
    controllerAs: "taxRateCtrl",
    bindToController: true,
    require:["^cardItemList", "^taxRateList", "taxRate"],
    link: (scope, el, attr, ctrls) => {

        ctrls[2].cardItemList = ctrls[0];
        ctrls[2].taxRateListCtrl = ctrls[1];
    }
  }
}
