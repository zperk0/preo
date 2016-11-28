export default function promotionDates(){
  return {
    restrict: 'E',
    scope: {
      promotion:"=",
    },
    template: require("./promotionDates.tpl.html"),
    link: (scope, el, attr, ctrl) => {

      scope.startChange = function(){

      }
    }
  }
}
