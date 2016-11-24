export default function promotionUsage(){
  return {
    restrict: 'E',
    scope: {
      promotion:"=",
    },
    template: require("./promotionUsage.tpl.html"),
    link: (scope, el, attr, ctrl) => {

    }
  }
}
