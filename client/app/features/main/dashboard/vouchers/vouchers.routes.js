
import controller from './vouchers.controller';

/**
 * Routing function for vouchers
 * @param  $stateProvider
 */

export default function routes($stateProvider, Permissions) {
  "ngInject";
  $stateProvider.state("main.dashboard.vouchers", {
    url: "/vouchers",
    template: require("./vouchers.tpl.html"),
    controller: controller.UID,
    controllerAs: "vouchers",
    requiresPermission:Permissions.VOUCHERS

  });
}
