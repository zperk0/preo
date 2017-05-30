
import controller from './myTags.controller'

/**
 * Routing function for eventList
 * @param  $stateProvider
 */
/* @ngInject */
export default function routes($stateProvider) {
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
    }
  });
}
