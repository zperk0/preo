// Import Style
import './paymentMethods.scss';


// Import internal modules
import controller from './paymentMethods.controller';
import routes from './paymentMethods.routes';

export default angular.module("paymentMethods" , ['ui.router'])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
