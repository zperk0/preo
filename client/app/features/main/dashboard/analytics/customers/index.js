// Import Style
import './analyticsCustomers.scss';

// Import internal modules
import controller from './analyticsCustomers.controller';
import routes from './analyticsCustomers.routes';

export default angular.module("analyticsCustomers" , [])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
