
import controller from './weborders.controller';

/**
 * Routing function for weborders
 * @param  $stateProvider
 */

export default function routes($stateProvider, Permissions) {
  "ngInject";
  $stateProvider.state("main.dashboard.styling.weborders", {
    url: "/weborders",
    requiresPermission:Permissions.VENUE_CREATE,
    views:{
     stylingContent:{
       template: require("./weborders.tpl.html"),
       controller: controller.UID,
       controllerAs: "vm"
      }
    }
  });
}
