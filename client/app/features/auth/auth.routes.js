
import controller from './auth.controller';

/**
 * Routing function for auth
 * @param  $stateProvider
 */

export default function routes($stateProvider) {
  "ngInject";
  $stateProvider.state("auth", {
    url: "/auth",
    abstract:true,
    template: require("./auth.tpl.html"),
    controller: controller.UID,
    controllerAs: "authCtrl"
  });
}
