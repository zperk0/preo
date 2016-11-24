
import controller from './taxGroups.controller'

/**
 * Routing function for taxGroups
 * @param  $stateProvider
 */
/* @ngInject */
export default function routes($stateProvider, Permissions) {
  "ngInject";
  $stateProvider.state("main.dashboard.taxes.taxGroups", {
    url: "/taxGroups",
    requiresPermission:Permissions.TAXES,
     views:{
      taxesContent:{
        template: require("./taxGroups.tpl.html"),
        controller: controller.UID,
        controllerAs: "taxGroupsCtrl"
      }
    }
  });
}
