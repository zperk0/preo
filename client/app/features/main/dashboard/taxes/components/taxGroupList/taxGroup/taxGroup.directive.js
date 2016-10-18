import controller from './taxGroup.controller'

export default function taxGroup(){
  return {
    restrict: 'E',
    scope: {
        taxGroup:"="
    },
    template: require("./taxGroup.tpl.html"),
    controller: controller.UID,
    controllerAs: "taxGroupCtrl",
    bindToController: true,
    require:["^cardItemList", "^taxGroupList", "taxGroup"],
    link: (scope, el, attr, ctrls) => {

        ctrls[2].cardItemList = ctrls[0];
        ctrls[2].taxGroupListCtrl = ctrls[1];
    }
  }
}
