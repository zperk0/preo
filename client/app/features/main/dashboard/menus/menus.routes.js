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

      // authenticated -> this is from main.routes.js and makes sure there is an USER and a VENUE set in userService and venueService
      items:function(authenticated, $q, $state, ItemService, ErrorService, StateService, Spinner) {
        return $q((resolve, reject) => {
          Spinner.show('resolve-menus');
          ItemService.fetchItems(StateService.venue.id)
          .then(items => {
            resolve(items);
          }, error => {
            Spinner.hide('resolve-menus');
            console.log('error fetching items', error);
            ErrorService.showRetry(ErrorService.FAILED_LOADING_MENUS);
            $state.go('main.dashboard.home');
          });
        });
      },
      tags:function(authenticated, $q, $state, StateService, ErrorService, Spinner) {
        return $q((resolve, reject) => {
          Preoday.CustomTag.getByVenueId(StateService.venue.id)
          .then(tags => {
            resolve(tags);
            console.log('got tags', tags);
          }, error => {
            Spinner.hide('resolve-menus');
            console.log('error', error);
            ErrorService.showRetry(ErrorService.FAILED_LOADING_MENUS);
            $state.go('main.dashboard.home');
          });
        });
      }
    }
  });
}
