// Import Style
import './signin.scss';


// Import internal modules
import controller from './signin.controller';
import routes from './signin.routes';

export default angular.module("signin" , ['ui.router'])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
