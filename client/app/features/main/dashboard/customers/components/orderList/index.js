// Import internal modules
import controller from './orderList.controller';
import directive from './orderList.directive';

import order from './order';

export default angular.module("orderList" , [order])

  .controller(controller.UID, controller)
  .directive("orderList", directive)
  .name;