// Import Style
import './outlets.scss';


import angular from 'angular';
import uirouter from 'angular-ui-router';

// Import internal modules
import controller from './outlets.controller';
import routes from './outlets.routes';

export default angular.module("outlets" , [uirouter])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
