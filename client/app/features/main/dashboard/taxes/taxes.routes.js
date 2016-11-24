
import controller from './taxes.controller'

/**
 * Routing function for taxes
 * @param  $stateProvider
 */
/* @ngInject */
export default function routes($stateProvider, Permissions) {
  "ngInject";
  $stateProvider.state("main.dashboard.taxes", {
    url: "/taxes",
    abstract:true,
    template: require("./taxes.tpl.html"),
    controller: controller.UID,
    requiresPermission:Permissions.TAXES,
    controllerAs: "taxesCtrl"
  });
}
