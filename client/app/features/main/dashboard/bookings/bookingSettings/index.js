// Import Style
import './bookingSettings.scss';


import angular from 'angular';
import uirouter from 'angular-ui-router';

// Import internal modules
import controller from './bookingSettings.controller';
import routes from './bookingSettings.routes';

export default angular.module("bookingSettings" , [uirouter])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
