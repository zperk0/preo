// Import Style
import './bookingList.scss';


import angular from 'angular';
import uirouter from 'angular-ui-router';

// Import internal modules
import controller from './bookingList.controller';
import routes from './bookingList.routes';


export default angular.module("bookingList" , [uirouter])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
