// Import Style
import './emailSuccess.scss';


// Import internal modules
import controller from './emailSuccess.controller';
import routes from './emailSuccess.routes';


export default angular.module("emailSuccess" , ['ui.router'])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
