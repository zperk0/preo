
import controller from './notes.controller'

/**
 * Routing function for eventList
 * @param  $stateProvider
 */
/* @ngInject */
export default function routes($stateProvider) {
  "ngInject";
  $stateProvider.state("main.dashboard.customers.notes", {
    url: "/notes",
    views: {
    	customerDetailContent: {
		    template: require("./notes.tpl.html"),
		    controller: controller.UID,
		    controllerAs: "notesCtrl"
    	}
    }
  });
}
