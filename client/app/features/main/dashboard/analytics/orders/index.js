// Import Style
import './analyticsOrders.scss';

// Import internal modules
import controller from './analyticsOrders.controller';
import routes from './analyticsOrders.routes';

export default angular.module("analyticsOrders" , [])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
