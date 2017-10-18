
import controller from './main.controller';

/**
 * Routing function for main
 * @param  $stateProvider
 */

export default function routes($stateProvider) {
  "ngInject";
  $stateProvider.state("main", {
    url: "/:entityId/main",
    abstract: true,
    template: require("./main.tpl.html"),
    controller: controller.UID,
    controllerAs: "vm",
    resolve: {
      // authenticated -> this makes sure there is an USER and a VENUE set in userService and venueService if you inject "authenticate" in any resolve routes
    	authenticated: function ($q, $state, $stateParams, $timeout, UserService, VenueService) {

    		// this is needed because the $stateParams is empty in a service inside of a resolve function
    		VenueService.venueId = $stateParams.entityId;
    		if (UserService.isAuth()) {
          if (VenueService.hasVenueSet()){
            return $q.when();
          } else {
            return VenueService.selectVenue()
          }
    		}

        var deferred = $q.defer();
    		UserService.auth()
    			.then(() => {
    				VenueService.selectVenue()
    					.then(deferred.resolve, deferred.reject);
    			}, () => {
	    			$timeout(() => {
	    				$state.go('auth.signin');
	    			});

    				deferred.reject();
    			});

    		return deferred.promise;
    	}
    }
  });
}
