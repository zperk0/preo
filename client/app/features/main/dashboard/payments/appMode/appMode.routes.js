
import controller from './appMode.controller';

/**
 * Routing function for appMode
 * @param  $stateProvider
 */

export default function routes($stateProvider) {
  "ngInject";
  $stateProvider.state("main.dashboard.payments.appMode", {
    url: "/appMode",
    template: require("./appMode.tpl.html"),
    controller: controller.UID,
    controllerAs: "vm"
  });
}
