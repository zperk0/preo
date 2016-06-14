
import controller from './notFound.controller';

/**
 * Routing function for notFound
 * @param  $stateProvider
 */
/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider.state("notFound", {
    url: "/404",
    template: require("./notFound.tpl.html"),
    controller: controller.UID,
    controllerAs: "vm"
  });
}
