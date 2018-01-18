
import controller from './sellerDetails.controller'
import entitiesResolve from 'app/components/contextual/contextualDrawer/entities/entities.resolve';

/**
 * Routing function for sellerDetails
 * @param  $stateProvider
 */
/* @ngInject */
export default function routes($stateProvider, Permissions) {
  "ngInject";
  $stateProvider.state("main.dashboard.taxes.sellerDetails", {
    url: "/sellerDetails",
    requiresPermission:Permissions.TAXES,
    resolve: {
      entities: entitiesResolve
    },
     views:{
      taxesContent:{
        template: require("./sellerDetails.tpl.html"),
        controller: controller.UID,
        controllerAs: "sellerDetailsCtrl"
      }
    }
  });
}
