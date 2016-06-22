
import controller from './voucherMenus.controller'

/**
 * Routing function for voucherMenus
 * @param  $stateProvider
 */

export default function routes($stateProvider) {
  "ngInject";
  $stateProvider.state("voucherMenus", {
    url: "/voucherMenus",
    template: require("./voucherMenus.tpl.html"),
    controller: controller.UID,
    controllerAs: "voucherMenus"
  });
}
