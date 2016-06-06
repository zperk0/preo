
import controller from './emails.controller';

/**
 * Routing function for emails
 * @param  $stateProvider
 */
/* @ngInject */
export default function routes($stateProvider) {
  'ngInject';
  $stateProvider.state("main.dashboard.styling.emails", {
    url: "/emails",
    template: require("./emails.tpl.html"),
    controller: controller.UID,
    controllerAs: "vm"
  });
}
