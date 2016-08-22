// Import Style
import './weborders.scss';

// Import internal modules
import controller from './weborders.controller';
import routes from './weborders.routes';

export default angular.module("weborders" , ['ui.router'])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
