import uirouter from 'angular-ui-router';

// Import internal modules
import ordersHistoryController from './ordersHistory.controller';
import ordersDetailController from './ordersDetail.controller';
import routes from './orders.routes';

export default angular.module("orders" , [uirouter])
  .config(routes)
  .controller(ordersHistoryController.UID, ordersHistoryController)
  .controller(ordersDetailController.UID, ordersDetailController)
  .name;
