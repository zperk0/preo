
import controller from './venueSettings.controller';

/**
 * Routing function for venueSettings
 * @param  $stateProvider
 */
/* @ngInject */
export default function routes($stateProvider) {
  'ngInject';
  $stateProvider.state("main.dashboard.venueSettings", {
    url: "/venueSettings",
    template: require("./venueSettings.tpl.html"),
    controller: controller.UID,
    controllerAs: "vm"
  });
}
