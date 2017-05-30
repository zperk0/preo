
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
      },
      tagGroups:function($q, venueId, Spinner) {
        return $q((resolve, reject) => {
          Spinner.show('fetch-tag-groups');
          Preoday.CustomTagGroup.getByVenueId(venueId)
          .then(tagGroups => {
            resolve(tagGroups);
            Spinner.hide('fetch-tag-groups');
            console.log('got tag groups', tagGroups);
          }, error => {
            reject(error);
            Spinner.hide('fetch-tag-groups');
            console.log('error', error);
          });
        });
      },
      tagActions:function($q, venueId, Spinner) {
        return $q((resolve, reject) => {
          Spinner.show('fetch-tag-actions');
          Preoday.CustomTagAction.getByVenueId(venueId)
          .then(tagActions => {
            resolve(tagActions);
            Spinner.hide('fetch-tag-actions');
            console.log('got tag actions', tagActions);
          }, error => {
            reject(error);
            Spinner.hide('fetch-tag-actions');
            console.log('error', error);
          });
        });
      }
    }
  });
}
