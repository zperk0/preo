// Import Style
import './bookings.scss';


import angular from 'angular';
import uirouter from 'angular-ui-router';

// Import internal modules
import controller from './bookings.controller';
import routes from './bookings.routes';


export default angular.module("bookings" , [uirouter])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
