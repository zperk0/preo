
import controller from './customers.controller'
import customersSearchController from './customersSearch/customersSearch.controller'
import customerController from './customer/customer.controller'
import customersPlaceholderController from './customersPlaceholder/customersPlaceholder.controller'

import customersResolve from './customers.resolve';

/**
 * Routing function for customers
 * @param  $stateProvider
 */
/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider.state("main.dashboard.customers", {
    url: "/customers",
    template: require("./customers.tpl.html"),
    abstract: true,
    controller: controller.UID,
    controllerAs: "$customers"
  });

  $stateProvider.state('main.dashboard.customers.placeholder', {
    url: '',
    views: {
    	'customerView': {
    		template: require('./customersPlaceholder/customersPlaceholder.tpl.html'),
            controller: customersPlaceholderController.UID,
            controllerAs: '$placeholder'
    	},
    }
  });

  $stateProvider.state('main.dashboard.customers.new', {
    url: "/new",
    params: {
    	skipResolve: true
    },
    views: {
    	'customerDetailView@main.dashboard.customers.new': {
		    template: require('./customer/customer.tpl.html'),
		    controller: customerController.UID,
		    controllerAs: '$customer',
		},
    	'customerView': {
    		template: require('./customersSearch/customersSearch.tpl.html'),
		    controller: customersSearchController.UID,
		    controllerAs: '$search',
    	}
    },
    resolve: {
        customers: customersResolve,
        customer: (StateService, UserService) => {
          const customer = new Preoday.User({
            venueId: StateService.venue && StateService.venue.id,
          });

          return customer;
        }
    }
  });

  $stateProvider.state('main.dashboard.customers.search', {
    url: '/search/:value',
    params: {
        skipResolve: false
    },
    views: {
        'customerView': {
            template: require('./customersSearch/customersSearch.tpl.html'),
            controller: customersSearchController.UID,
            controllerAs: '$search',
        }
    },
    resolve: {
        customers: customersResolve
    }
  });

  $stateProvider.state('main.dashboard.customers.search.details', {
    url: '/:customerId',
    params: {
    	skipResolve: false,
        customers: null
    },
    views: {
        'customerDetailView': {
            template: require('./customer/customer.tpl.html'),
            controller: customerController.UID,
            controllerAs: '$customer',
            resolve: {
                customer: ($q, customers, $stateParams, $state, $timeout) => {
                    console.log('customer resolve here', $stateParams);
                    const customerId = $stateParams.customerId;
                    // get customers results from search controller if sent
                    const _customers = $stateParams.customers || customers;
                    const filtered = _customers.filter((customer) => {
                      return +customer.id === +customerId;
                    });

                    if (filtered.length) {
                      return $q.when(filtered[0]);
                    }

                    $timeout(() => {
                      $state.go("main.dashboard.customers.placeholder");
                    });

                    return $q.reject();
                }
            }
        },
    },
  });
}
