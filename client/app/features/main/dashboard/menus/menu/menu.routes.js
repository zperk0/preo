
import controller from './menu.controller';

/**
 * Routing function for menu
 * @param  $stateProvider
 */

export default function routes($stateProvider, Permissions) {
  "ngInject";
  $stateProvider.state("main.dashboard.menus.menu", {
    url: "/{menuId:[0-9]*}/:sectionId?/:itemId?/",
    requiresPermission:Permissions.MENUS,
    views:{
      menuContent:{
        template: require("./menu.tpl.html"),
        controller: controller.UID,
        controllerAs: "vm",
      }
    }
  });
}
