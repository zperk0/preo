// Import Style
import './bookingList.scss';


// Import internal modules
import controller from './bookingList.controller';
import routes from './bookingList.routes';


export default angular.module("bookingList" , ['ui.router'])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
