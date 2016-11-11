
import controller from './stripeSuccess.controller'

/**
 * Routing function for stripeSuccess
 * @param  $stateProvider
 */
/* @ngInject */
export default function routes($stateProvider) {
  "ngInject";
  $stateProvider.state("stripeSuccess", {
    url: "/stripe-success/:token",
    template: require("./stripeSuccess.tpl.html"),
    controller: controller.UID,
    controllerAs: "stripeSuccessCtrl"
  });
}
