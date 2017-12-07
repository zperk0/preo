// Import internal modules
import controller from './orderDetail.controller';
import directive from './orderDetail.directive';

export default angular.module("orderDetail" , [])

  .controller(controller.UID, controller)
  .directive("orderDetail", directive)
  .name;