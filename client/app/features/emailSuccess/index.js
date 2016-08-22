// Import Style
import './emailSuccess.scss';


import angular from 'angular';
import uirouter from 'angular-ui-router';

// Import internal modules
import controller from './emailSuccess.controller';
import routes from './emailSuccess.routes';


export default angular.module("emailSuccess" , [uirouter])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
