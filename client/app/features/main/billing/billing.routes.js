
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
    controllerAs: "billing"
  });
}
