
import controller from './modifierList.controller'

/**
 * Routing function for modifierList
 * @param  $stateProvider
 */
export default function routes($stateProvider) {
  'ngInject';
  $stateProvider.state("main.dashboard.menus.modifierList", {
    url: "/modifierList",
    views:{
      menuContent:{
        template: require("./modifierList.tpl.html"),
        controller: controller.UID,
        controllerAs: "vm"
      }
    }
  });
}
