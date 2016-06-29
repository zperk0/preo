
import controller from './modifierList.controller'

/**
 * Routing function for modifierList
 * @param  $stateProvider
 */
/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider.state("main.dashboard.menus.modifierList", {
    url: "/modifierList",
    views:{
      menuContent:{
        template: require("./modifierList.tpl.html"),
        controller: controller.UID,
        controllerAs: "modifierList"
      }
    }
  });
}
