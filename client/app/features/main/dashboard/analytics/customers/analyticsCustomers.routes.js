
import controller from './analyticsCustomers.controller'

/**
 * Routing function for analyticsCustomers
 * @param  $stateProvider
 */
/* @ngInject */
export default function routes($stateProvider, Permissions) {
  "ngInject;"
  $stateProvider.state("main.dashboard.analytics.analyticsCustomers", {
    url: "/analyticsCustomers/:reportName?",
    requiresPermission:Permissions.ANALYTICS,
     views:{
      analyticsContent:{
        template: require("./analyticsCustomers.tpl.html"),
        controller: controller.UID,
        controllerAs: "analyticsCustomersCtrl"
      }
    }
  });
}
