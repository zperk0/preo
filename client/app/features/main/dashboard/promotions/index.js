// Import Style
import './promotions.scss';


// Import internal modules
import controller from './promotions.controller';
import routes from './promotions.routes';

angular.module("promotions" , ['ui.router'])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
