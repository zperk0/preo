export default function promotionDisplay(){
  return {
    restrict: 'E',
    scope: {
      promotion:"=",
    },
    template: require("./promotionDisplay.tpl.html"),
    require:"^contextualMenu",
    link: (scope, el, attr, ctrl) => {
      scope.contextualMenuCtrl = ctrl;
      scope.$displayInMenu = scope.promotion.displayName ? true : false;

      scope.onDisplayChange = function(){
        scope.promotion.displayName = '';
      }
    }
  }
}
