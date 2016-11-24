
import controller from './modifiers.controller'

/**
 * Routing function for modifiers
 * @param  $stateProvider
 */
export default function routes($stateProvider, Permissions) {
  'ngInject';
  $stateProvider.state("main.dashboard.menus.modifiers", {
    url: "/modifiers",
    requiresPermission:Permissions.MENUS,
    views:{
      menuContent:{
        template: require("./modifiers.tpl.html"),
        controller: controller.UID,
        controllerAs: "modifiersViewCtrl"
      }
    }
  });
}
