
import controller from './main.controller';

/**
 * Routing function for main
 * @param  $stateProvider
 */

export default function routes($stateProvider) {
  "ngInject";
  $stateProvider.state("main", {
    url: "/:venueId/main",
    abstract: true,
    template: require("./main.tpl.html"),
    controller: controller.UID,
    controllerAs: "vm",
    resolve: {
    	authenticated: function ($q, $stateParams, $timeout, UserService, VenueService) {
    		
    		// this is needed because the $stateParams is empty in a service inside of a resolve function
    		VenueService.venueId = $stateParams.venueId;

    		if (UserService.isAuth()) {
    			return $q.when();
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
