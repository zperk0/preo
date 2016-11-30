export default function promotionEvents(){
  return {
    restrict: 'E',
    scope: {
      promotion:"=",
      events:"="
    },
    replace:true,
    template: require("./promotionEvents.tpl.html"),
    link: (scope, el, attr, ctrl) => {

    }
  }
}
