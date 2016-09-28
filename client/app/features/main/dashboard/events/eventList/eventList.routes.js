
import controller from './eventList.controller'

/**
 * Routing function for eventList
 * @param  $stateProvider
 */
/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider.state("main.dashboard.events.eventList", {
    url: "/list",
    views: {
    	eventContent: {
		    template: require("./eventList.tpl.html"),
		    controller: controller.UID,
		    controllerAs: "eventListViewCtrl"
    	}
    }
  });
}
