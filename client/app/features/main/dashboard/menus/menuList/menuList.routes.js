
import controller from './menuList.controller';

/**
 * Routing function for menuList
 * @param  $stateProvider
 */

export default function routes($stateProvider) {
  "ngInject";
  $stateProvider.state("main.dashboard.menus.list", {
    url: "/menu",
    views:{
      menuContent:{
        template: require("./menuList.tpl.html"),
        controller: controller.UID,
        controllerAs: "vm",
      }
    }
  });
}
