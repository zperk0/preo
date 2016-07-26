import controller from './menuCardItem.controller'

export default function menuCardItem(){
  return {
    restrict: 'E',
    scope: {
      menu:"="
    },
    template: require("./menuCardItem.tpl.html"),
    controller: controller.UID,
    controllerAs: "vm",
    bindToController: true,
    require:["^cardItemList", "^menuCardList", "menuCardItem"],
    link: (scope, el, attr, ctrls) => {
      ctrls[2].menuCardListCtrl = ctrls[1]
      ctrls[2].cardItemList = ctrls[0]
    }
  }
}
