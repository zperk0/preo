
import controller from './events.controller';

/**
 * Routing function for events
 * @param  $stateProvider
 */

export default function routes($stateProvider) {
  "ngInject";
  $stateProvider.state("main.dashboard.events", {
    url: "/events",
    template: require("./events.tpl.html"),
    controller: controller.UID,
    controllerAs: "eventsViewCtrl"
  });
}
