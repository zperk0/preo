export default function promotionDisplay(){
  return {
    restrict: 'E',
    scope: {
      promotion:"=",
    },
    template: require("./promotionDisplay.tpl.html"),
    link: (scope, el, attr, ctrl) => {

    }
  }
}
