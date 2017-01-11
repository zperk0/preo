
import controller from './analytics.controller';

/**
 * Routing function for analytics
 * @param  $stateProvider
 */

export default function routes($stateProvider, Permissions) {
  "ngInject";
  $stateProvider.state("main.dashboard.analytics", {
    url: "/analytics",
    template: require("./analytics.tpl.html"),
    controller: controller.UID,
    controllerAs: "analyticsCtrl",
    requiresPermission: Permissions.ANALYTICS
  });
}
