// Import Style
import './venueLocation.scss';

// Import internal modules
import controller from './venueLocation.controller';
import routes from './venueLocation.routes';


export default angular.module("venueLocation" , ['ui.router'])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
