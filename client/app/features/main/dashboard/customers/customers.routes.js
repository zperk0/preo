
import controller from './customers.controller'

/**
 * Routing function for customers
 * @param  $stateProvider
 */
/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider.state("main.dashboard.customers", {
    url: "/customers",
    template: require("./customers.tpl.html"),
    controller: controller.UID,
    controllerAs: "$customers"
  });
}
