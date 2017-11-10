// Import Style
import './customers.scss';

import placeholder from './placeholder';
import search from './search';
import customer from './customer';


import angular from 'angular';
import searchPanel from 'app/components/searchPanel';

import scrollToCustomer from './components/scrollToCustomer/scrollToCustomer.directive';

// Import internal modules
import controller from './customers.controller';
import routes from './customers.routes';


export default angular.module("webapp.customers" , [
	'ui.router',
  searchPanel,
  placeholder,
  search,
	customer,
	])
  .config(routes)
  .controller(controller.UID, controller)
  .directive('scrollToCustomer', scrollToCustomer)
  .name;
