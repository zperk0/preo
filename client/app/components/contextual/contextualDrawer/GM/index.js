// Import internal modules
import orderHistoryController from './orderHistory/contextualDrawer.orderHistory.controller';
import orderHistoryDirective from './orderHistory/contextualDrawer.orderHistory.directive';

import orderDetailController from './orderDetail/contextualDrawer.orderDetail.controller';
import orderDetailDirective from './orderDetail/contextualDrawer.orderDetail.directive';

export default angular.module("GM" , [])

  .controller(orderHistoryController.UID, orderHistoryController)
  .directive("contextualDrawerOrderHistory", orderHistoryDirective)

  .controller(orderDetailController.UID, orderDetailController)
  .directive("contextualDrawerOrderDetail", orderDetailDirective)

  .name;