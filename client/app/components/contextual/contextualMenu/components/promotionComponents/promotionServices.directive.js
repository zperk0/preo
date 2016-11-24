export default function promotionServices(){
  return {
    restrict: 'E',
    scope: {
      promotion:"=",
    },
    template: require("./promotionServices.tpl.html"),
    link: (scope, el, attr, ctrl) => {

    }
  }
}
