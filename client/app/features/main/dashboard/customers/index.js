// Import Style
import './customers.scss';


import angular from 'angular';
import searchPanel from 'app/components/searchPanel';
import customerList from './components/customerList';
import customersPlaceholder from './components/customersPlaceholder';

// Import internal modules
import controller from './customers.controller';
import customersSearchController from './customersSearch/customersSearch.controller';
import customerController from './customer/customer.controller';
import routes from './customers.routes';


export default angular.module("webapp.customers" , [
	'ui.router',
	searchPanel,
	customerList,
	customersPlaceholder
	])
  .config(routes)
  .controller(controller.UID, controller)
  .controller(customersSearchController.UID, customersSearchController)
  .controller(customerController.UID, customerController)
  .name;
