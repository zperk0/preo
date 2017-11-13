// Import Style
import './customers.scss';

import placeholder from './placeholder';
import search from './search';
import customer from './customer';
import notes from './notes';
import orders from './orders';


import angular from 'angular';
import searchPanel from 'app/components/searchPanel';


import scrollToCustomer from './components/scrollToCustomer/scrollToCustomer.directive';

// Import internal modules
import controller from './customers.controller';
import routes from './customers.routes';
import customerNoteList from './components/customerNoteList';
import orderList from './components/orderList';
import orderDetail from './components/orderDetail';


export default angular.module("webapp.customers" , [
	'ui.router',
  searchPanel,
  placeholder,
  search,
  customer,
  notes,
  orders,
  customerNoteList,
  orderList,
  orderDetail
	])
  .config(routes)
  .controller(controller.UID, controller)
  .directive('scrollToCustomer', scrollToCustomer)
  .name;
