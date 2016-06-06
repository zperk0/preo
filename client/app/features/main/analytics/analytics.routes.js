
import controller from './analytics.controller';

/**
 * Routing function for analytics
 * @param  $stateProvider
 */
/* @ngInject */
export default function routes($stateProvider) {
  'ngInject';
  $stateProvider.state("main.analytics", {
    url: "/analytics",
    template: require("./analytics.tpl.html"),
    controller: controller.UID,
    controllerAs: "analytics"
  });
}
