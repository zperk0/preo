import controller from './promotion.controller'

export default function promotion(){
  return {
    restrict: 'E',
    scope: {
      promotion:"="
    },
    template: require("./promotion.tpl.html"),
    controller: controller.UID,
    controllerAs: "promotionCtrl",
    bindToController: true,
    require:["^cardItemList", "^promotionsList", "promotion"],
    link: (scope, el, attr, ctrls) => {
        ctrls[2].cardItemList = ctrls[0];
        ctrls[2].promotionsListCtrl = ctrls[1];
    }
  }
}
