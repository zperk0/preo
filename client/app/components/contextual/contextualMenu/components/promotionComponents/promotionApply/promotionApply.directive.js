export default function promotionApply(){
  return {
    restrict: 'E',
    scope: {
      promotion:"=",
    },
    template: require("./promotionApply.tpl.html"),
    replace:true,
    require:'^contextualMenu',
    link: (scope, el, attr, contextualMenuCtrl) => {
      scope.contextualMenuCtrl = contextualMenuCtrl;

      scope.onTypeChange = function(){
        scope.promotion.code = "";
      }

    }
  }
}
