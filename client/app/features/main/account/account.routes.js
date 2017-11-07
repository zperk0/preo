
import controller from './account.controller';

/**
 * Routing function for account
 * @param  $stateProvider
 */

export default function routes($stateProvider) {
  "ngInject";
  $stateProvider.state("main.account", {
    url: "/account",
    template: require("./account.tpl.html"),
    controller: controller.UID,
    controllerAs: "vm"
  });
}
