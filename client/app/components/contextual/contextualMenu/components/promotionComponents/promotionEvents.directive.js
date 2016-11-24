export default function promotionEvents(){
  return {
    restrict: 'E',
    scope: {
      promotion:"=",
    },
    template: require("./promotionEvents.tpl.html"),
    link: (scope, el, attr, ctrl) => {

    }
  }
}
