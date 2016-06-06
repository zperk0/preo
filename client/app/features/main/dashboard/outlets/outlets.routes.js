
import controller from './outlets.controller';

/**
 * Routing function for outlets
 * @param  $stateProvider
 */
/* @ngInject */
export default function routes($stateProvider) {
  'ngInject';
  $stateProvider.state("main.dashboard.outlets", {
    url: "/outlets",
    template: require("./outlets.tpl.html"),
    controller: controller.UID,
    controllerAs: "outlets"
  });
}
