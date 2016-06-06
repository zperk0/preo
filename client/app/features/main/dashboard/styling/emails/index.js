// Import Style
import './emails.scss';


import angular from 'angular';
import uirouter from 'angular-ui-router';

// Import internal modules
import controller from './emails.controller';
import routes from './emails.routes';

export default angular.module("emails" , [uirouter])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
