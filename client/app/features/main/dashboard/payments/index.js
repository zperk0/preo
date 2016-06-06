// Import Style
import './payments.scss';


import angular from 'angular';
import uirouter from 'angular-ui-router';

// Import internal modules
import controller from './payments.controller';
import routes from './payments.routes';

export default angular.module("payments" , [uirouter])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
