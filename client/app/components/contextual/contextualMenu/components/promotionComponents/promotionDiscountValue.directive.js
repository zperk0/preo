export default function promotionDiscountValue(){
  return {
    restrict: 'E',
    scope: {
      promotion:"=",
    },
    template: require("./promotionDiscountValue.tpl.html"),
    link: (scope, el, attr, ctrl) => {

    }
  }
}
