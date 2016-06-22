
import controller from './paymentMethods.controller';

/**
 * Routing function for paymentMethods
 * @param  $stateProvider
 */

export default function routes($stateProvider) {
  "ngInject";
  $stateProvider.state("main.dashboard.payments.paymentMethods", {
    url: "/paymentMethods",
    template: require("./paymentMethods.tpl.html"),
    controller: controller.UID,
    controllerAs: "vm"
  });
}
