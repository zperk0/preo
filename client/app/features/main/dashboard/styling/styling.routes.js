
import controller from './styling.controller';

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
      auth:(authenticated)=>{
        return authenticated
      }
    }
  });
}
