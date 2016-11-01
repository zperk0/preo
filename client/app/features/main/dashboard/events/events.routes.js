
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
    controllerAs: "eventsViewCtrl",
    resolve: {

    	// authenticated -> this is from main.routes.js and makes sure there is an USER and a VENUE set in userService and venueService
    	isEvent: function ($q, $state, $stateParams, $timeout, authenticated, VenueService) {

    		if (VenueService.hasVenueSet() && VenueService.currentVenue.isEvent()) {

    			return $q.when();
    		} else {

    			$timeout(() => {

    				$state.go('main.dashboard');
    			});

    			return $q.reject();
    		}
    	}
    }
  });
}
