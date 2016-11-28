export default function promotionDisplay(){
  return {
    restrict: 'E',
    scope: {
      promotion:"=",
    },
    template: require("./promotionDisplay.tpl.html"),
    require:"^contextualMenu",
    replace:true,
    link: (scope, el, attr, ctrl) => {
      scope.contextualMenuCtrl = ctrl;

      scope.onDisplayChange = function(){
        scope.promotion.displayName = '';
      }
    }
  }
}
