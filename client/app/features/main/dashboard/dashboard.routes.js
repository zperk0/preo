
import controller from './dashboard.controller';

/**
 * Routing function for dashboard
 * @param  $stateProvider
 */
/* @ngInject */
export default function routes($stateProvider) {
  'ngInject';
  $stateProvider.state("main.dashboard", {
    url: "/dashboard",
    template: require("./dashboard.tpl.html"),
    controller: controller.UID,
    controllerAs: "vm"
  });
}
