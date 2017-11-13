import controller from './notes.controller';
import controllerNew from './notesNew.controller';

import notesResolve from './notes.resolve';
import ordersResolve from '../orders/orders.resolve';

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
      notes: notesResolve
    }
  });

  $stateProvider.state("main.dashboard.customers.search.notes.new", {
    url: "/new",
    views: {
    	'customerDetailView@main.dashboard.customers.search': {
        template: `<contextual-drawer-customer-notes-new orders="notesNewCtrl.orders" notes="notesNewCtrl.notes" open="true" success="success()" error="error()"></contextual-drawer-customer-notes-new>`,
		    controller: controllerNew.UID,
		    controllerAs: "notesNewCtrl"
    	}
    },
    resolve: {
      // authenticated -> this is from main.routes.js and makes sure there is an USER and a VENUE set in userService and venueService
      orders: ordersResolve
    }
  });
}
