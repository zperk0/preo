export default function promotionCustomer(){
  return {
    restrict: 'E',
    scope: {
      promotion:"=",
    },
    template: require("./promotionCustomer.tpl.html"),
    replace:true,
    require:'^contextualMenu',
    link: (scope, el, attr, contextualMenuCtrl) => {
 
    }
  }
}
