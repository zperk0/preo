import controller from './notes.controller';
import controllerNew from './notesNew.controller';

/**
 * Routing function for eventList
 * @param  $stateProvider
 */
/* @ngInject */
export default function routes($stateProvider) {
  "ngInject";
  $stateProvider.state("main.dashboard.customers.search.notes", {
    url: "/:customerId/notes",
    views: {
    	customerDetailView: {
        template: `<contextual-drawer-customer-notes collection="notesCtrl.notes" open="true" success="success()" error="error()"></contextual-drawer-customer-notes>`,
		    controller: controller.UID,
		    controllerAs: "notesCtrl"
    	}
    },
    params: {
      customers: null
    },
    resolve: {
      // authenticated -> this is from main.routes.js and makes sure there is an USER and a VENUE set in userService and venueService
      notes:function($q, $stateParams, authenticated, Spinner, ErrorService) {
        return $q((resolve, reject) => {
          Spinner.show('fetch-notes');
          Preoday.CustomerNote.getByUserId($stateParams.customerId, 'operator')
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
  $stateProvider.state("main.dashboard.customers.search.notes.new", {
    url: "/new",
    views: {
    	customerDetailView: {
        template: `<contextual-drawer-customer-notes-new orders="notesNewCtrl.orders" open="true" success="success()" error="error()"></contextual-drawer-customer-notes-new>`,
		    controller: controllerNew.UID,
		    controllerAs: "notesNewCtrl"
    	}
    },
    resolve: {
      // authenticated -> this is from main.routes.js and makes sure there is an USER and a VENUE set in userService and venueService
      orders:function($q, $stateParams, authenticated, Spinner, ErrorService) {
        return $q((resolve, reject) => {
          Spinner.show('fetch-orders');
          Preoday.Order.getOrdersByUserId($stateParams.customerId)
          .then(orders => {
            resolve(orders);
            console.log('got orders', orders);
          }, error => {
            reject(error);
            Spinner.hide('fetch-orders');
            $state.go('main.dashboard');
            ErrorService.showRetry(ErrorService.FAILED_LOADING_ORDERS);
            console.log('error', error);
          });
        });
      }
    }
  });
}
