
import controller from './billing.controller'

/**
 * Routing function for billing
 * @param  $stateProvider
 */
/* @ngInject */
export default function routes($stateProvider) {
  "ngInject";
  $stateProvider.state("main.billing", {
    url: "/billing",
    template: require("./billing.tpl.html"),
    controller: controller.UID,
    controllerAs: "billingCtrl",
     resolve:{
      // authenticated -> this is from main.routes.js and makes sure there is an USER and a VENUE set in userService and venueService
      maps:function(authenticated, $q){
        "ngInject";
        if (window.Stripe){
          return $q.resolve();
        }
        var deferred = $q.defer();
        $script('https://js.stripe.com/v2/', ()=>{
          console.log("loaded stripe, reoslving");
          deferred.resolve();
        });
        return deferred.promise;
        // return authenticated;
      }
    }
  });
}
