
import controller from './updateExternalMenus.controller';

/**
 * Routing function for updateExternalMenus
 * @param  $stateProvider
 */

export default function routes($stateProvider, Permissions) {
  "ngInject";
  $stateProvider.state("main.dashboard.updateExternalMenus", {
    url: "/updateExternalMenus",
    template: require("./updateExternalMenus.tpl.html"),
    controller: controller.UID,
    controllerAs: "updateExternalMenusCtrl",
    requiresPermission: Permissions.MENU,
    resolve :{
      auth:(authenticated)=>{
        return authenticated
      }
    }
  });
}
