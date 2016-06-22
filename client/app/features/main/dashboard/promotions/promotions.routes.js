
import controller from './promotions.controller';

/**
 * Routing function for promotions
 * @param  $stateProvider
 */

export default function routes($stateProvider) {
  "ngInject";
  $stateProvider.state("main.dashboard.promotions", {
    url: "/promotions",
    template: require("./promotions.tpl.html"),
    controller: controller.UID,
    controllerAs: "promotions"
  });
}
