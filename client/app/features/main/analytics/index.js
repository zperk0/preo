// Import Style
import './analytics.scss';


// Import internal modules
import controller from './analytics.controller';
import routes from './analytics.routes';


export default angular.module("analytics" , ['ui.router'])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
