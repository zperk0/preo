
import controller from './taxRates.controller'

/**
 * Routing function for taxRates
 * @param  $stateProvider
 */
/* @ngInject */
export default function routes($stateProvider, Permissions) {
  "ngInject";
  $stateProvider.state("main.dashboard.taxes.taxRates", {
    url: "/taxRates",
    requiresPermission:Permissions.TAXES,
     views:{
      taxesContent:{
        template: require("./taxRates.tpl.html"),
        controller: controller.UID,
        controllerAs: "taxRatesCtrl"
      }
    }
  });
}
