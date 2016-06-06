// Import Style
import './events.scss';


import angular from 'angular';
import uirouter from 'angular-ui-router';

// Import internal modules
import controller from './events.controller';
import routes from './events.routes';

export default angular.module("events" , [uirouter])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
