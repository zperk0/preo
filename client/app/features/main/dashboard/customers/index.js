// Import Style
import './customers.scss';


import angular from 'angular';
import searchPanel from 'app/components/searchPanel';
import customerList from './components/customerList';
import customersPlaceholder from './components/customersPlaceholder';
import notes from './notes';
import orders from './orders';


import scrollToCustomer from './components/scrollToCustomer/scrollToCustomer.directive';

// Import internal modules
import controller from './customers.controller';
import customersSearchController from './customersSearch/customersSearch.controller';
import customerController from './customer/customer.controller';
import customersPlaceholderController from './customersPlaceholder/customersPlaceholder.controller';
import customerNoteList from './components/customerNoteList';
import orderList from './components/orderList';
import orderDetail from './components/orderDetail';

import customersRoutes from './customers.routes';
import customersSearchRoutes from './customersSearch/customersSearch.routes';
import customersPlaceholderRoutes from './customersPlaceholder/customersPlaceholder.routes';
import customerRoutes from './customer/customer.routes';


export default angular.module("webapp.customers" , [
	'ui.router',
	searchPanel,
	customerList,
	customersPlaceholder,
    notes,
    orders,
    customerNoteList,
    orderList,
    orderDetail
	])
  .config(customersRoutes)
  .config(customersSearchRoutes)
  .config(customersPlaceholderRoutes)
  .config(customerRoutes)
  .controller(controller.UID, controller)
  .controller(customersSearchController.UID, customersSearchController)
  .controller(customerController.UID, customerController)
  .controller(customersPlaceholderController.UID, customersPlaceholderController)
  .directive('scrollToCustomer', scrollToCustomer)
  .name;
