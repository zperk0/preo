  import controller from './menus.controller';

/**
 * Routing function for menus
 * @param  $stateProvider
 */

export default function routes($stateProvider, Permissions) {
  "ngInject";
  $stateProvider.state("main.dashboard.menus", {
    url: "/menus",
    abstract:true,
    template: require("./menus.tpl.html"),
    requiresPermission:Permissions.MENUS,
    controller: controller.UID,
    controllerAs: "menus",
    resolve: {
      venueId: function ($q, $timeout, $state, VenueService) {

    		if (VenueService.hasVenueSet()) {

    			return $q.when(VenueService.currentVenue.id);
    		} else {

    			$timeout(() => {

    				$state.go('main.dashboard');
    			});

    			return $q.reject();
    		}
    	},
      tags:function($q, venueId, Spinner) {
        return $q((resolve, reject) => {
          Spinner.show('fetch-tags');
          Preoday.CustomTag.getByVenueId(venueId)
          .then(tags => {
            resolve(tags);
            Spinner.hide('fetch-tags');
            console.log('got tags', tags);
          }, error => {
            reject(error);
            Spinner.hide('fetch-tags');
            console.log('error', error);
          });
        });
      }
    }
  });
}
