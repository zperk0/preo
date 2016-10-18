
import controller from './taxGroups.controller'

/**
 * Routing function for taxGroups
 * @param  $stateProvider
 */
/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider.state("main.dashboard.taxes.taxGroups", {
    url: "/taxGroups",
     views:{
      taxesContent:{
        template: require("./taxGroups.tpl.html"),
        controller: controller.UID,
        controllerAs: "taxGroupsCtrl"
      }
    }
  });
}
