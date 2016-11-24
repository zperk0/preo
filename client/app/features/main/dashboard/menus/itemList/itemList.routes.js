
import controller from './itemList.controller'

/**
 * Routing function for itemList
 * @param  $stateProvider
 */
export default function routes($stateProvider, Permissions) {
  "ngInject";
  $stateProvider.state("main.dashboard.menus.itemList", {
    url: "/itemList/:itemId?",
    requiresPermission:Permissions.MENUS,
    views:{
      menuContent:{
        template: require("./itemList.tpl.html"),
        controller: controller.UID,
        controllerAs: "itemListCtrl"
      }
    }
  });
}
