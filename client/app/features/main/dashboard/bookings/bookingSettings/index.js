// Import Style
import './bookingSettings.scss';


// Import internal modules
import controller from './bookingSettings.controller';
import routes from './bookingSettings.routes';

export default angular.module("bookingSettings" , ['ui.router'])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
