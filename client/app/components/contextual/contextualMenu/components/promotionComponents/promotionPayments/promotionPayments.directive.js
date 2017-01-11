export default function promotionPayments(){
  return {
    restrict: 'E',
    scope: {
      promotion:"=",
    },
    template: require("./promotionPayments.tpl.html"),
    link: (scope, el, attr, ctrl) => {

      scope.isCard = scope.promotion.paymentType === 'CARD' || !scope.promotion.paymentType ? true : false;
      scope.isCash =  scope.promotion.paymentType === 'CASH' || !scope.promotion.paymentType  ? true : false;

      scope.onTypeChange = function(){
        if (scope.isCard && scope.isCash){
          scope.promotion.paymentType =  null;
        } else if (scope.isCard){
          scope.promotion.paymentType = "CARD"
        } else if (scope.isCash) {
          scope.promotion.paymentType = "CASH"
        } else{
          scope.promotion.paymentType = null
        }
      }

    }
  }
}
