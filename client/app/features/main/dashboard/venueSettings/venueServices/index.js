// Import Style
import './venueServices.scss';

// Import internal modules
import controller from './venueServices.controller';
import routes from './venueServices.routes';

export default angular.module("venueServices" , ['ui.router'])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
