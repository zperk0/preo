// Import Style
import './bookingMenus.scss';


// Import internal modules
import controller from './bookingMenus.controller';
import routes from './bookingMenus.routes';


export default angular.module("bookingMenus" , ['ui.router'])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
