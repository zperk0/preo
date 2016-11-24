
import controller from './collectionSlots.controller'

/**
 * Routing function for collectionSlots
 * @param  $stateProvider
 */
/* @ngInject */
export default function routes($stateProvider, Permissions) {
  $stateProvider.state("main.dashboard.events.collectionSlots", {
    url: "/collectionSlots",
    requiresPermission:Permissions.EVENTS,
    views: {
    	eventContent: {
		    template: require("./collectionSlots.tpl.html"),
		    controller: controller.UID,
		    controllerAs: "collectionSlotsViewCtrl"
    	}
    }
  });
}
