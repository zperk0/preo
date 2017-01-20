
import controller from './signup.controller';

/**
 * Routing function for signup
 * @param  $stateProvider
 */

export default function routes($stateProvider) {
  "ngInject";
  $stateProvider.state("auth.signup", {
    url: "/signup",
    template: require("./signup.tpl.html"),
    controller: controller.UID,
    controllerAs: "signupCtrl"
  });
}
