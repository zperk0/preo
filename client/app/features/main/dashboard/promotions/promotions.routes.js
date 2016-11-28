
import controller from './promotions.controller';

/**
 * Routing function for promotions
 * @param  $stateProvider
 */

export default function routes($stateProvider, Permissions) {
  "ngInject";
  $stateProvider.state("main.dashboard.promotions", {
    url: "/promotions/:promotionId?",
    template: require("./promotions.tpl.html"),
    controller: controller.UID,
    requiresPermission:Permissions.OFFERS,
    controllerAs: "promotionsCtrl"
  });
}
