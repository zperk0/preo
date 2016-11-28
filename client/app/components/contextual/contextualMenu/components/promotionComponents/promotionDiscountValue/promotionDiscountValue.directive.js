export default function promotionDiscountValue(){
  return {
    restrict: 'E',
    scope: {
      promotion:"=",
    },
    template: require("./promotionDiscountValue.tpl.html"),
    replace:true,
    require:'^contextualMenu',
    link: (scope, el, attr, contextualMenuCtrl) => {
      scope.contextualMenuCtrl = contextualMenuCtrl;

      scope.onTypeChange = function(){
          scope.promotion.amount = "";
      }
    }
  }
}
