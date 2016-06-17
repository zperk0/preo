
import controller from './menu.controller';

/**
 * Routing function for menu
 * @param  $stateProvider
 */
/* @ngInject */
export default function routes($stateProvider) {
  'ngInject';
  $stateProvider.state("main.dashboard.menus.menu", {
    url: "/:menuId/:sectionId?/:itemId?",
    views:{
      menuContent:{
        template: require("./menu.tpl.html"),
        controller: controller.UID,
        controllerAs: "vm",
      }
    }
  });
}
