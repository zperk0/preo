
import controller from './placeholder.controller';

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
    		template: require('./placeholder.tpl.html'),
            controller: controller.UID,
            controllerAs: '$placeholder'
    	},
    }
  });
}
