
import controller from './notifications.controller';

/**
 * Routing function for notifications
 * @param  $stateProvider
 */
/* @ngInject */
export default function routes($stateProvider) {
  'ngInject';
  $stateProvider.state("main.dashboard.notifications", {
    url: "/notifications",
    template: require("./notifications.tpl.html"),
    controller: controller.UID,
    controllerAs: "notifications"
  });
}
