// Import Style
import './billing.scss';


// Import internal modules
import controller from './billing.controller';
import routes from './billing.routes';


export default angular.module("billing" , ['ui.router'])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
