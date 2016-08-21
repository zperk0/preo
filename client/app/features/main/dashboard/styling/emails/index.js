// Import Style
import './emails.scss';


// Import internal modules
import controller from './emails.controller';
import routes from './emails.routes';

export default angular.module("emails" , ['ui.router'])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
