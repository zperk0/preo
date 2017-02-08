// Import Style
import './signup.scss';


// Import internal modules
import controller from './signup.controller';
import routes from './signup.routes';

export default angular.module("signup" , ['ui.router'])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
