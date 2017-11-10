
import customersSearchController from './customersSearch.controller';

import customersResolve from '../customers.resolve';

/**
 * Routing function for customers
 * @param  $stateProvider
 */
/* @ngInject */
export default function searchRoutes($stateProvider) {
    'ngInject';

  $stateProvider.state('main.dashboard.customers.search', {
    url: '/search/:value',
    params: {
        skipResolve: false
    },
    views: {
        'customerView': {
            template: require('./customersSearch.tpl.html'),
            controller: customersSearchController.UID,
            controllerAs: '$search',
        }
    },
    resolve: {
        customers: customersResolve
    }
  });
}
