
import controller from './payments.controller';

/**
 * Routing function for payments
 * @param  $stateProvider
 */
/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider.state("main.dashboard.payments", {
    url: "/payments",
    template: require("./payments.tpl.html"),
    controller: controller.UID,
    controllerAs: "payments"
  });
}
