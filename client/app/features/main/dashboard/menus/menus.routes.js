  import controller from './menus.controller';

/**
 * Routing function for menus
 * @param  $stateProvider
 */

export default function routes($stateProvider, Permissions) {
  "ngInject";
  $stateProvider.state("main.dashboard.menus", {
    url: "/menus",
    abstract:true,
    template: require("./menus.tpl.html"),
    requiresPermission:Permissions.MENUS,
    controller: controller.UID,
    controllerAs: "menus"
  });
}
