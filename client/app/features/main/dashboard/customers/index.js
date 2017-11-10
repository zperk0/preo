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
import customersPlaceholderController from './customersPlaceholder/customersPlaceholder.controller';

import customersRoutes from './customers.routes';
import customersSearchRoutes from './customersSearch/customersSearch.routes';
import customersPlaceholderRoutes from './customersPlaceholder/customersPlaceholder.routes';
import customerRoutes from './customer/customer.routes';


export default angular.module("webapp.customers" , [
	'ui.router',
	searchPanel,
	customerList,
	customersPlaceholder
	])
  .config(customersRoutes)
  .config(customersSearchRoutes)
  .config(customersPlaceholderRoutes)
  .config(customerRoutes)
  .controller(controller.UID, controller)
  .controller(customersSearchController.UID, customersSearchController)
  .controller(customerController.UID, customerController)
  .controller(customersPlaceholderController.UID, customersPlaceholderController)
  .name;
