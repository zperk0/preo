
import controller from './invite.controller';

/**
 * Routing function for signup
 * @param  $stateProvider
 */

export default function routes($stateProvider) {
  "ngInject";

  $stateProvider.state("auth.invite", {
    url: "/invite/:inviteKey",
    template: "",
    controller: controller.UID,
    controllerAs: "signupCtrl",
  });
}
