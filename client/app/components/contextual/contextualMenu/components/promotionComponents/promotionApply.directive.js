export default function promotionApply(){
  return {
    restrict: 'E',
    scope: {
      promotion:"=",
    },
    template: require("./promotionApply.tpl.html"),
    link: (scope, el, attr, ctrl) => {

    }
  }
}
