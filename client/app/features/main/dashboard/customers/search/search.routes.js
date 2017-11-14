
import controller from './search.controller';

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
        customers: null
    },
    views: {
        'customerView': {
            template: require('./search.tpl.html'),
            controller: controller.UID,
            controllerAs: '$search',
        }
    },
    resolve: {
        customers: customersResolve
    }
  });
}
