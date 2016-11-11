// Import Style
import './stripeSuccess.scss';


// Import internal modules
import controller from './stripeSuccess.controller';
import routes from './stripeSuccess.routes';


export default angular.module("stripeSuccess" , ['ui.router'])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
