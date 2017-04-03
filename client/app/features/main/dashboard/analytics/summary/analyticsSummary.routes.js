
import controller from './analyticsSummary.controller'

/**
 * Routing function for analyticsSummary
 * @param  $stateProvider
 */
/* @ngInject */
export default function routes($stateProvider, Permissions) {
  "ngInject;"
  $stateProvider.state("main.dashboard.analytics.analyticsSummary", {
    url: "/analyticsSummary",
    requiresPermission:Permissions.ANALYTICS,
     views:{
      analyticsContent:{
        template: require("./analyticsSummary.tpl.html"),
        controller: controller.UID,
        controllerAs: "analyticsSummaryCtrl"
      }
    }
  });
}
