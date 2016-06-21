
import controller from './weborders.controller';

/**
 * Routing function for weborders
 * @param  $stateProvider
 */
/* @ngInject */
export default function routes($stateProvider) {
  'ngInject';
  $stateProvider.state("main.dashboard.styling.weborders", {
    url: "/weborders",
    template: require("./weborders.tpl.html"),
    controller: controller.UID,
    controllerAs: "vm"
  });
}