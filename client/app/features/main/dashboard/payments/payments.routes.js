
import controller from './payments.controller';

/**
 * Routing function for payments
 * @param  $stateProvider
 */

export default function routes($stateProvider, Permissions) {
  "ngInject";
  $stateProvider.state("main.dashboard.payments", {
    url: "/payments",
    template: require("./payments.tpl.html"),
    controller: controller.UID,
    controllerAs: "paymentsCtrl",
    requiresPermission:Permissions.ACCOUNT,
    resolve:{
      // authenticated -> this is from main.routes.js and makes sure there is an USER and a VENUE set in userService and venueService
      auth:function(authenticated, MapsService){
        "ngInject";
        return authenticated;
      }
    }
  });
}
