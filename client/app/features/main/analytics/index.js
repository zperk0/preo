// Import Style
import './analytics.scss';


import angular from 'angular';
import uirouter from 'angular-ui-router';

// Import internal modules
import controller from './analytics.controller';
import routes from './analytics.routes';


export default angular.module("analytics" , [uirouter])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
