
import controller from './styling.controller';
import entitiesResolve from 'app/components/contextual/contextualDrawer/entities/entities.resolve';

/**
 * Routing function for styling
 * @param  $stateProvider
 */

export default function routes($stateProvider, Permissions) {
  "ngInject";
  $stateProvider.state("main.dashboard.styling", {
    url: "/styling",
    template: require("./styling.tpl.html"),
    controller: controller.UID,
    controllerAs: "vm",
    requiresPermission:Permissions.VENUE_CREATE,
    resolve :{
      entities: entitiesResolve,
      auth:(authenticated)=>{
        return authenticated
      }
    }
  });
}
