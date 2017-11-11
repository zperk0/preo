// Import Style

import angular from 'angular';

// Import internal modules
import controller from './customer.controller';

import routes from './customer.routes';

export default angular.module('customerDetail' , [
	'ui.router',
	])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
