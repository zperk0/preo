// Import Style
import './home.scss';


// Import internal modules
import controller from './home.controller';
import routes from './home.routes';


export default angular.module("webapp.home" , ['ui.router'])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
