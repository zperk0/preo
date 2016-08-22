
import controller from './emailSuccess.controller'

/**
 * Routing function for emailSuccess
 * @param  $stateProvider
 */
/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider.state("emailSuccess", {
    url: "/email-success/:token",
    template: require("./emailSuccess.tpl.html"),
    controller: controller.UID,
    controllerAs: "emailSuccess"
  });
}
