
import controller from './collectionSlots.controller'

/**
 * Routing function for collectionSlots
 * @param  $stateProvider
 */
/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider.state("main.dashboard.events.collectionSlots", {
    url: "/collectionSlots",
    views: {
    	eventContent: {
		    template: require("./collectionSlots.tpl.html"),
		    controller: controller.UID,
		    controllerAs: "collectionSlotsViewCtrl"
    	}
    }
  });
}
