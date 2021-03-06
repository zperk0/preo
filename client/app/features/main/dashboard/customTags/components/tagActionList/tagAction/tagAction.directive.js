import controller from './tagAction.controller'

export default function tagAction(){
  "ngInject";
  return {
    restrict: 'E',
    scope: {
        tagAction: '='
    },
    template: require("./tagAction.tpl.html"),
    controller: controller.UID,
    controllerAs: "vm",
    replace: true,
    bindToController: true,
    require:["^cardItemList", "^tagActionList", "tagAction"],
    link: (scope, el, attr, ctrls) => {

      ctrls[2].cardItemList = ctrls[0];
      ctrls[2].tagActionListCtrl = ctrls[1];
    }
  }
}
