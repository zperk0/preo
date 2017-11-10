
import customersPlaceholderController from './customersPlaceholder.controller';

/**
 * Routing function for customers
 * @param  $stateProvider
 */
/* @ngInject */
export default function placeholderRoutes($stateProvider) {
    'ngInject';

  $stateProvider.state('main.dashboard.customers.placeholder', {
    url: '',
    views: {
    	'customerView': {
    		template: require('./customersPlaceholder.tpl.html'),
            controller: customersPlaceholderController.UID,
            controllerAs: '$placeholder'
    	},
    }
  });
}
