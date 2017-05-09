
import controller from './redirect.controller'

/**
 * Routing function for redirect
 * @param  $stateProvider
 */
/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider.state("redirect", {
    url: "/redirect/:destination/:timeout/:refresh",
    template: require("./redirect.tpl.html"),
    controller: controller.UID,
    controllerAs: "redirectCtrl"
  });
}
