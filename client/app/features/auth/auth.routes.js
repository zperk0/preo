
import controller from './auth.controller';

/**
 * Routing function for auth
 * @param  $stateProvider
 */
/* @ngInject */
export default function routes($stateProvider) {
  'ngInject';
  $stateProvider.state("auth", {
    url: "/auth",
    abstract:true,
    template: require("./auth.tpl.html"),
    controller: controller.UID,
    controllerAs: "vm"
  });
}
