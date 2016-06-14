
import controller from './menuList.controller';

/**
 * Routing function for menuList
 * @param  $stateProvider
 */
/* @ngInject */
export default function routes($stateProvider) {
  'ngInject';
  $stateProvider.state("main.dashboard.menus.list", {
    url: "",
    views:{
      menuContent:{
        template: require("./menuList.tpl.html"),
        controller: controller.UID,
        controllerAs: "vm",
      }
    }
  });
}
