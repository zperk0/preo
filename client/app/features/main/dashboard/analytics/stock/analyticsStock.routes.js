
import controller from './analyticsStock.controller'

/**
 * Routing function for analyticsStock
 * @param  $stateProvider
 */
/* @ngInject */
export default function routes($stateProvider, Permissions) {
  "ngInject;"
  $stateProvider.state("main.dashboard.analytics.analyticsStock", {
    url: "/analyticsStock",
    requiresPermission:Permissions.ANALYTICS,
     views:{
      analyticsContent:{
        template: require("./analyticsStock.tpl.html"),
        controller: controller.UID,
        controllerAs: "analyticsStockCtrl"
      }
    }
  });
}
