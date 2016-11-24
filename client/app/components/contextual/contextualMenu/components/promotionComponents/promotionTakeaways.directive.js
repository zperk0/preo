export default function promotionTakeaways(){
  return {
    restrict: 'E',
    scope: {
      promotion:"=",
    },
    template: require("./promotionTakeaways.tpl.html"),
    link: (scope, el, attr, ctrl) => {

    }
  }
}
