
import controller from './notes.controller'

/**
 * Routing function for eventList
 * @param  $stateProvider
 */
/* @ngInject */
export default function routes($stateProvider) {
  "ngInject";
  $stateProvider.state("main.dashboard.customers.notes", {
    url: "/notes",
    views: {
    	customerDetailContent: {
		    template: require("./notes.tpl.html"),
		    controller: controller.UID,
		    controllerAs: "notesCtrl"
    	}
    },
    resolve: {
      // authenticated -> this is from main.routes.js and makes sure there is an USER and a VENUE set in userService and venueService
      notes:function($q, authenticated, Spinner, ErrorService) {
        return $q((resolve, reject) => {
          Spinner.show('fetch-notes');
          Preoday.User.getNotes(411)
          .then(notes => {
            resolve(notes);
            console.log('got notes', notes);
          }, error => {
            reject(error);
            Spinner.hide('fetch-notes');
            $state.go('main.dashboard');
            ErrorService.showRetry(ErrorService.FAILED_LOADING_NOTES);
            console.log('error', error);
          });
        });
      }
    }
  });
}
