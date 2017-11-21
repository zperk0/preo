
import customersSearchController from '../search/search.controller';
import customerController from './customer.controller'

import customersResolve from '../customers.resolve';
import customerResolve from '../customer.resolve';

/**
 * Routing function for customers
 * @param  $stateProvider
 */
/* @ngInject */
export default function customerRoutes($stateProvider) {
    'ngInject';

  $stateProvider.state('main.dashboard.customers.new', {
    url: "/new",
    params: {
    	customers: []
    },
    views: {
    	'customerDetailView@main.dashboard.customers.new': {
		    template: require('./customer.tpl.html'),
		    controller: customerController.UID,
		    controllerAs: '$customer',
		},
    	'customerView': {
    		template: require('../search/search.tpl.html'),
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

  $stateProvider.state('main.dashboard.customers.search.details', {
    url: '/:customerId',
    views: {
        'customerDetailView': {
            template: require('./customer.tpl.html'),
            controller: customerController.UID,
            controllerAs: '$customer',
            resolve: {
                customer: customerResolve
            }
        },
    },
  });
}
