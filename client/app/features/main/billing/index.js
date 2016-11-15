// Import Style
import './billing.scss';


// Import internal modules
import controller from './billing.controller';
import routes from './billing.routes';

import billingInfo from './components/billingInfo';
import userCard from './components/userCard';


export default angular.module("billing" , ['ui.router', billingInfo, userCard])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
