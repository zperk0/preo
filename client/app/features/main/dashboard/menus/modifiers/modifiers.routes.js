
import controller from './modifiers.controller'

/**
 * Routing function for modifiers
 * @param  $stateProvider
 */
export default function routes($stateProvider) {
  'ngInject';
  $stateProvider.state("main.dashboard.menus.modifiers", {
    url: "/modifiers",
    views:{
      menuContent:{
        template: require("./modifiers.tpl.html"),
        controller: controller.UID,
        controllerAs: "vm"
      }
    }
  });
}
