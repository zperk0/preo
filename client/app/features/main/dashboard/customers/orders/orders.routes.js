import ordersHistoryController from './ordersHistory.controller';
import ordersDetailController from './ordersDetail.controller';

import ordersResolve from './orders.resolve';
import orderDetailResolve from './order.resolve';

/**
 * Routing function for eventList
 * @param  $stateProvider
 */
/* @ngInject */
export default function routes($stateProvider) {
  "ngInject";
  $stateProvider.state("main.dashboard.customers.search.orders", {
    url: "/:customerId/orders",
    abstract: true,
    views: {
      customerDetailView: {
        template: `<ui-view name="orderContent"></ui-view>`
      }
    }
  });
  $stateProvider.state("main.dashboard.customers.search.orders.history", {
    url: "/history",
    views: {
    	orderContent: {
        template: `<contextual-drawer-order-history orders="orderHistoryCtrl.orders" open="true" success="success()" error="error()"></contextual-drawer-order-history>`,
		    controller: ordersHistoryController.UID,
		    controllerAs: "orderHistoryCtrl"
    	}
    },
    resolve: {
      // authenticated -> this is from main.routes.js and makes sure there is an USER and a VENUE set in userService and venueService
      orders: ordersResolve
    }
  });
  $stateProvider.state("main.dashboard.customers.search.orders.detail", {
    url: "/:orderId",
    views: {
    	orderContent: {
        template: `<contextual-drawer-order-detail order="orderDetailCtrl.order" open="true" success="success()" error="error()"></contextual-drawer-order-detail>`,
		    controller: ordersDetailController.UID,
		    controllerAs: "orderDetailCtrl"
    	}
    },
    resolve: {
      // authenticated -> this is from main.routes.js and makes sure there is an USER and a VENUE set in userService and venueService
      order: orderDetailResolve
    }
  });
}
