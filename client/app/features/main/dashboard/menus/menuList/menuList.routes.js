
import controller from './menuList.controller';

/**
 * Routing function for menuList
 * @param  $stateProvider
 */

export default function routes($stateProvider, Permissions ) {
  "ngInject";
  $stateProvider.state("main.dashboard.menus.list", {
    url: "/menu",
    requiresPermission:Permissions.MENUS,
    views:{
      menuContent:{
        template: require("./menuList.tpl.html"),
        controller: controller.UID,
        controllerAs: "vm",
      }
    }
  });
}
