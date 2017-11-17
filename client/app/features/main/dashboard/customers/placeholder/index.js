// Import Style

import angular from 'angular';
import customersPlaceholder from '../components/customersPlaceholder';

// Import internal modules
import controller from './placeholder.controller';

import routes from './placeholder.routes';


export default angular.module('customersPlaceholderView' , [
	'ui.router',
	customersPlaceholder
	])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
