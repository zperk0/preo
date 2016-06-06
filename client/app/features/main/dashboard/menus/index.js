// Import Style
import './menus.scss';


import angular from 'angular';
import uirouter from 'angular-ui-router';

// Import internal modules
import controller from './menus.controller';
import routes from './menus.routes';

export default angular.module("menus" , [uirouter])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
