
export default function billingInfo(gettextCatalog){
  "ngInject";
  return {
    restrict: 'E',
    scope: {
      account:"=",
      packages:"="
    },
    template: require("./billingInfo.tpl.html"),
    replace: true,
    link: (scope, el, attr, ctrl) => {

      scope.getBillingDate = function(){
        if (scope.account.billingDate){
          return moment(scope.account.billingDate).format("Do MMMM YYYY");
        }
        return gettextCatalog.getString("Billing date not set")
      }
      scope.getTotal = function (){
        if (scope.packages && scope.packages.length){
          var total = 0;
          scope.packages.forEach((p)=>{
            total+= p.subscriptionPrice;
          })
        }
        return 0;
      }
    }
  }
}
