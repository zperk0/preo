export default function promotionServices(){
  return {
    restrict: 'E',
    scope: {
      promotion:"=",
    },
    template: require("./promotionServices.tpl.html"),
    link: (scope, el, attr, ctrl) => {

      scope.isCollection = scope.promotion.orderType === 'PICKUP' || !scope.promotion.orderType ? true : false;
      scope.isDelivery =  scope.promotion.orderType === 'DELIVERY' || !scope.promotion.orderType  ? true : false;

      scope.onTypeChange = function(){
        if (scope.isCollection && scope.isDelivery){
          scope.promotion.orderType =  null;
        } else if (scope.isCollection){
          scope.promotion.orderType = "PICKUP"
        } else if (scope.isDelivery) {
          scope.promotion.orderType = "DELIVERY"
        } else{
          scope.promotion.orderType = null
        }
      }
    }
  }
}
