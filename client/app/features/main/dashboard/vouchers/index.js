// Import Style
import './vouchers.scss';


import angular from 'angular';
import uirouter from 'angular-ui-router';

// Import internal modules
import controller from './vouchers.controller';
import routes from './vouchers.routes';

export default angular.module("vouchers" , [uirouter])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
