import ordersHistoryController from './ordersHistory.controller';
import ordersDetailController from './ordersDetail.controller';

/**
 * Routing function for eventList
 * @param  $stateProvider
 */
/* @ngInject */
export default function routes($stateProvider) {
  "ngInject";
  $stateProvider.state("main.dashboard.customers.orders", {
    url: "/orders",
    parent: "main.dashboard.customers",
    abstract: true,
    views: {
      customerDetailContent: {
        template: `<ui-view name="orderContent"></ui-view>`
      }
    }
  });
  $stateProvider.state("main.dashboard.customers.orders.history", {
    url: "/history",
    parent: "main.dashboard.customers.orders",
    views: {
    	orderContent: {
        template: `<contextual-drawer-order-history orders="orderHistoryCtrl.orders" open="true" success="success()" error="error()"></contextual-drawer-order-history>`,
		    controller: ordersHistoryController.UID,
		    controllerAs: "orderHistoryCtrl"
    	}
    },
    resolve: {
      // authenticated -> this is from main.routes.js and makes sure there is an USER and a VENUE set in userService and venueService
      orders: function($q, $stateParams, $state, authenticated, Spinner, ErrorService) {
        return $q((resolve, reject) => {
          Spinner.show('fetch-orders');
          Preoday.Order.getOrdersByUserId($stateParams.customerId)
          .then(orders => {
            console.log('got orders', orders);
            resolve(orders);
          }, error => {
            console.log('error', error);
            reject(error);
            Spinner.hide('fetch-orders');
            $state.go('main.dashboard');
            ErrorService.showRetry(ErrorService.FAILED_LOADING_ORDERS);
          });
        });
      }
    }
  });
  $stateProvider.state("main.dashboard.customers.orders.detail", {
    url: "/:orderId",
    parent: "main.dashboard.customers.orders",
    views: {
    	orderContent: {
        template: `<contextual-drawer-order-detail order="orderDetailCtrl.order" open="true" success="success()" error="error()"></contextual-drawer-order-detail>`,
		    controller: ordersDetailController.UID,
		    controllerAs: "orderDetailCtrl"
    	}
    },
    resolve: {
      // authenticated -> this is from main.routes.js and makes sure there is an USER and a VENUE set in userService and venueService
      order: function($q, $stateParams, $state, authenticated, Spinner, ErrorService) {
        return $q((resolve, reject) => {
          Spinner.show('fetch-order');
          Preoday.Order.get($stateParams.orderId, 'venue,paymentNumber,permalink')
          .then(order => {
            console.log('got order', order);
            resolve(order);
          }, error => {
            console.log('error', error);
            reject(error);
            Spinner.hide('fetch-order');
            $state.go('main.dashboard');
            ErrorService.showRetry(ErrorService.FAILED_LOADING_ORDER);
          });
        });
      }
    }
  });
}
