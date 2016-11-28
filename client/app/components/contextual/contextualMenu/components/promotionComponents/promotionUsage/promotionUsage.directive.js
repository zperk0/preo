export default function promotionUsage(){
  return {
    restrict: 'E',
    scope: {
      promotion:"=",
    },
    template: require("./promotionUsage.tpl.html"),
    link: (scope, el, attr, ctrl) => {

      if (scope.promotion.maxUserClaims == 1){
        scope.typeChange= 'SINGLE'
        scope.promotion.firstOrder = 0;
      } else {
        scope.promotion.maxUserClaims = null;
        if (scope.promotion.firstOrder == 1){
          scope.typeChange = 'FIRST'
        } else {
          scope.typeChange = 'MULTI'
        }
      }


      scope.onTypeChange = function(newVal){
        switch(scope.typeChange) {
          case 'MULTI':
            scope.promotion.maxUserClaims = null;
            scope.promotion.firstOrder = 0;
            break;
          case 'SINGLE':
            scope.promotion.maxUserClaims = 1;
            scope.promotion.firstOrder = 0;
            break;
          case 'FIRST':
            scope.promotion.maxUserClaims = null;
            scope.promotion.firstOrder = 1;
            break;
        }
      }
    }
  }
}
