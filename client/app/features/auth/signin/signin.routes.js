
import controller from './signin.controller';

/**
 * Routing function for signin
 * @param  $stateProvider
 */

export default function routes($stateProvider) {
  "ngInject";
  $stateProvider.state("auth.signin", {
    url: "/signin",
    template: require("./signin.tpl.html"),
    controller: controller.UID,
    controllerAs: "vm"
  });
}
