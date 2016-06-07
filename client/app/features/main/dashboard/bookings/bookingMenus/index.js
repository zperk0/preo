// Import Style
import './bookingMenus.scss';


import angular from 'angular';
import uirouter from 'angular-ui-router';

// Import internal modules
import controller from './bookingMenus.controller';
import routes from './bookingMenus.routes';


export default angular.module("bookingMenus" , [uirouter])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
