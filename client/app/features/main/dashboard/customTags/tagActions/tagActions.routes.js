
import controller from './tagActions.controller'

/**
 * Routing function for eventList
 * @param  $stateProvider
 */
/* @ngInject */
export default function routes($stateProvider, Permissions) {
  "ngInject";
  $stateProvider.state("main.dashboard.customTags.tagActions", {
    url: "/tagActions",
    requiresPermission:Permissions.MENUS,
    requiresFeature:Preoday.constants.Feature.ITEM_TAGS,
    views: {
    	customTagContent: {
		    template: require("./tagActions.tpl.html"),
		    controller: controller.UID,
		    controllerAs: "tagActionsCtrl"
    	}
    },
    resolve: {

      // authenticated -> this is from main.routes.js and makes sure there is an USER and a VENUE set in userService and venueService
      tagActions:function($q, $state, authenticated, StateService, Spinner, ErrorService) {
        return $q((resolve, reject) => {
          Spinner.show('fetch-tags');
          Preoday.CustomTagAction.getByVenueId(StateService.venue.id)
          .then(tagActions => {
            resolve(tagActions);
            console.log('got tag actions', tagActions);
          }, error => {
            reject(error);
            Spinner.hide('fetch-tags');
            $state.go('main.dashboard');
            ErrorService.showRetry(ErrorService.FAILED_LOADING_TAGS);
            console.log('error', error);
          });
        });
      },
      tagGroups:function($q, $state, authenticated, StateService, Spinner, ErrorService) {
        return $q((resolve, reject) => {
          Preoday.CustomTagGroup.getByVenueId(StateService.venue.id)
          .then(tagGroups => {
            resolve(tagGroups);
            console.log('got tag groups', tagGroups);
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
