
import controller from './customers.controller'
import customersSearchController from './customersSearch/customersSearch.controller'
import customerController from './customer/customer.controller'

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
		    resolve: {
		    	customers: customersResolve
		    }
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
		    resolve: {
		    	customers: customersResolve
		    }
    	}
    }
  });
}
