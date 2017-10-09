// Import styles
import './order.scss';

// Import internal modules
import controller from './order.controller';
import directive from './order.directive';

export default angular.module("order" , [])
  .controller(controller.UID, controller)
  .directive("order", directive)
  .name;
