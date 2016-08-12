import controller from './outlet.controller'

export default function outlet(){
  return {
    restrict: 'E',
    scope: {
        outlet: '=',
        hasActions: '=?'
    },
    template: require("./outlet.tpl.html"),
    controller: controller.UID,
    controllerAs: "vm",
    replace: true,
    bindToController: true,
    require:["^cardItemList", "^outletList", "outlet"],
    link: (scope, el, attr, ctrls) => {

      ctrls[2].cardItemList = ctrls[0];
      ctrls[2].outletListCtrl = ctrls[1];
    }
  }
}
