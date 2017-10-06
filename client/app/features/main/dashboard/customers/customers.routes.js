
import controller from './customers.controller';

/**
 * Routing function for customers
 * @param  $stateProvider
 */

export default function routes($stateProvider) {
  "ngInject";
  $stateProvider.state("main.dashboard.customers", {
    url: "/customers/:customerId",
    template: require("./customers.tpl.html"),
    controller: controller.UID,
    controllerAs: "customersCtrl",
    resolve:{
      // authenticated -> this is from main.routes.js and makes sure there is an USER and a VENUE set in userService and venueService
      auth:function(authenticated){
        "ngInject";
        return authenticated;
      }
    }
  });
}
