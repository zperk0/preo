
import controller from './home.controller';

/**
 * Routing function for home
 * @param  $stateProvider
 */

export default function routes($stateProvider) {
  "ngInject";
  $stateProvider.state("main.dashboard.home", {
    url: "/home",
    template: require("./home.tpl.html"),
    controller: controller.UID,
    controllerAs: "homeCtrl"
  });
}
