
import controller from './analyticsOrders.controller'

/**
 * Routing function for analyticsSummary
 * @param  $stateProvider
 */
/* @ngInject */
export default function routes($stateProvider, Permissions) {
  "ngInject;"
  $stateProvider.state("main.dashboard.analytics.analyticsOrders", {
    url: "/analyticsOrders",
    requiresPermission:Permissions.ANALYTICS,
     views:{
      analyticsContent:{
        template: require("./analyticsOrders.tpl.html"),
        controller: controller.UID,
        controllerAs: "analyticsOrdersCtrl"
      }
    }
  });
}
