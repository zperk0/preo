// Import Style
import './notifications.scss';


import angular from 'angular';
import uirouter from 'angular-ui-router';

// Import internal modules
import controller from './notifications.controller';
import routes from './notifications.routes';


export default angular.module("notifications" , [uirouter])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
