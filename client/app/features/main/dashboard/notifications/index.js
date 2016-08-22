// Import Style
import './notifications.scss';


// Import internal modules
import controller from './notifications.controller';
import routes from './notifications.routes';


angular.module("notifications" , ['ui.router'])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
