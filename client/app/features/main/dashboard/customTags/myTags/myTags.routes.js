
import controller from './myTags.controller'

/**
 * Routing function for eventList
 * @param  $stateProvider
 */
/* @ngInject */
export default function routes($stateProvider, Permissions) {
  "ngInject";
  $stateProvider.state("main.dashboard.customTags.myTags", {
    url: "/myTags",
    requiresPermission:Permissions.MENUS,
    requiresFeature:Preoday.constants.Feature.ITEM_TAGS,
    views: {
    	customTagContent: {
		    template: require("./myTags.tpl.html"),
		    controller: controller.UID,
		    controllerAs: "myTagsCtrl"
    	}
    },
    resolve: {

      // authenticated -> this is from main.routes.js and makes sure there is an USER and a VENUE set in userService and venueService
      tags:function($q, $state, authenticated, VenueService, Spinner, ErrorService) {
        return $q((resolve, reject) => {
          Spinner.show('fetch-tags');
          Preoday.CustomTag.getByVenueId(VenueService.currentVenue.id)
          .then(tags => {
            resolve(tags);
            console.log('got tags', tags);
          }, error => {
            reject(error);
            Spinner.hide('fetch-tags');
            $state.go('main.dashboard');
            ErrorService.showRetry(ErrorService.FAILED_LOADING_TAGS);
            console.log('error', error);
          });
        });
      }
    }
  });
}
