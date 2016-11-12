// Import Style
import './payments.scss';


// Import internal modules
import controller from './payments.controller';
import routes from './payments.routes';


angular.module("webapp.payments" , ['ui.router'])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
