import controller from './customTag.controller'

export default function customTag(){
  return {
    restrict: 'E',
    scope: {
        customTag: '='
    },
    template: require("./customTag.tpl.html"),
    controller: controller.UID,
    controllerAs: "vm",
    replace: true,
    bindToController: true,
    require:["^cardItemList", "^customTagList", "customTag"],
    link: (scope, el, attr, ctrls) => {

      ctrls[2].cardItemList = ctrls[0];
      ctrls[2].customTagListCtrl = ctrls[1];
    }
  }
}
