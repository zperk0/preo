// Import Style

import angular from 'angular';
import customerList from '../components/customerList';

// Import internal modules
import controller from './search.controller';

import routes from './search.routes';

export default angular.module('customerSearch' , [
	'ui.router',
	customerList,
	])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
