
import controller from './customTags.controller'

/**
 * Routing function for tags
 * @param  $stateProvider
 */
/* @ngInject */
export default function routes($stateProvider, Permissions) {
  "ngInject";
  $stateProvider.state("main.dashboard.customTags", {
    url: "/tags",
    template: require("./customTags.tpl.html"),
    controller: controller.UID,
    controllerAs: "customTagsCtrl",
    abstract: true,
    requiresPermission:Permissions.MENUS,
    requiresFeature:Preoday.constants.Feature.ITEM_TAGS,
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
      },
      tagGroups:function($q, $state, authenticated, VenueService, Spinner, ErrorService) {
        return $q((resolve, reject) => {
          Preoday.CustomTagGroup.getByVenueId(VenueService.currentVenue.id)
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
      },
      tagActions:function($q, $state, authenticated, VenueService, Spinner, ErrorService) {
        return $q((resolve, reject) => {
          Preoday.CustomTagAction.getByVenueId(VenueService.currentVenue.id)
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
      }
    }
  });
}
