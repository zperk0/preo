// Import Style
import './paymentMethods.scss';


import angular from 'angular';
import uirouter from 'angular-ui-router';

// Import internal modules
import controller from './paymentMethods.controller';
import routes from './paymentMethods.routes';

export default angular.module("paymentMethods" , [uirouter])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
