
import controller from './menu.controller';

/**
 * Routing function for menu
 * @param  $stateProvider
 */

export default function routes($stateProvider, Permissions) {
  "ngInject";
  $stateProvider.state("main.dashboard.menus.menu", {
    url: "/{menuId:[0-9]*}/:sectionId?/:itemId?/",
    requiresPermission:Permissions.MENUS,
    views:{
      menuContent:{
        template: require("./menu.tpl.html"),
        controller: controller.UID,
        controllerAs: "vm",
      }
    },
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
