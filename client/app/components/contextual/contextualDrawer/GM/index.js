// Import internal modules
import customerNotesController from './customerNotes/contextualDrawer.customerNotes.controller';
import customerNotesDirective from './customerNotes/contextualDrawer.customerNotes.directive';

import customerNotesNewController from './customerNotesNew/contextualDrawer.customerNotesNew.controller';
import customerNotesNewDirective from './customerNotesNew/contextualDrawer.customerNotesNew.directive';

import orderHistoryController from './orderHistory/contextualDrawer.orderHistory.controller';
import orderHistoryDirective from './orderHistory/contextualDrawer.orderHistory.directive';

import orderDetailController from './orderDetail/contextualDrawer.orderDetail.controller';
import orderDetailDirective from './orderDetail/contextualDrawer.orderDetail.directive';

export default angular.module("GM" , [])

  .controller(customerNotesController.UID, customerNotesController)
  .directive("contextualDrawerCustomerNotes", customerNotesDirective)

  .controller(customerNotesNewController.UID, customerNotesNewController)
  .directive("contextualDrawerCustomerNotesNew", customerNotesNewDirective)

  .controller(orderHistoryController.UID, orderHistoryController)
  .directive("contextualDrawerOrderHistory", orderHistoryDirective)

  .controller(orderDetailController.UID, orderDetailController)
  .directive("contextualDrawerOrderDetail", orderDetailDirective)

  .name;