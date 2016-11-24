
import controller from './eventList.controller'

/**
 * Routing function for eventList
 * @param  $stateProvider
 */
/* @ngInject */
export default function routes($stateProvider, Permissions) {
  $stateProvider.state("main.dashboard.events.eventList", {
    url: "/list",
    requiresPermission:Permissions.EVENTS,
    views: {
    	eventContent: {
		    template: require("./eventList.tpl.html"),
		    controller: controller.UID,
		    controllerAs: "eventListViewCtrl"
    	}
    }
  });
}
