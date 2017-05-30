
import controller from './tagActions.controller'

/**
 * Routing function for eventList
 * @param  $stateProvider
 */
/* @ngInject */
export default function routes($stateProvider) {
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
    }
  });
}
