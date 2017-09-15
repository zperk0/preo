// Import Style
import './mobileApp.scss';


// Import internal modules
import controller from './mobileApp.controller';
import routes from './mobileApp.routes';


export default angular.module("mobileApp" , ['ui.router'])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
