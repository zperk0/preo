
import controller from './mobile.controller';

/**
 * Routing function for mobile
 * @param  $stateProvider
 */
/* @ngInject */
export default function routes($stateProvider) {
  'ngInject';
  $stateProvider.state("main.dashboard.styling.mobile", {
    url: "/mobile",
    template: require("./mobile.tpl.html"),
    controller: controller.UID,
    controllerAs: "vm"
  });
}
