
import controller from './voucherSettings.controller'

/**
 * Routing function for voucherSettings
 * @param  $stateProvider
 */

export default function routes($stateProvider) {
  "ngInject";
  $stateProvider.state("voucherSettings", {
    url: "/voucherSettings",
    template: require("./voucherSettings.tpl.html"),
    controller: controller.UID,
    controllerAs: "voucherSettings"
  });
}
