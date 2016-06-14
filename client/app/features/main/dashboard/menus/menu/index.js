// Import Style
import './menu.scss';


import angular from 'angular';
import uirouter from 'angular-ui-router';

// Import internal modules
import controller from './menu.controller';
import routes from './menu.routes';

export default angular.module("menu" , [uirouter])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
