// Import Style
import './mobile.scss';


// Import internal modules
import controller from './mobile.controller';
import routes from './mobile.routes';


export default angular.module("mobile" , ['ui.router'])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
