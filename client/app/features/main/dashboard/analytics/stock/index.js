// Import Style
import './analyticsStock.scss';

// Import internal modules
import controller from './analyticsStock.controller';
import routes from './analyticsStock.routes';
//import tableFilter from './analyticsStock.filter';
export default angular.module("analyticsStock" , [])
  .config(routes)
  .controller(controller.UID, controller)
  //.filter('tableFilter',tableFilter)
  .name;
