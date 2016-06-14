// Import Style
import './error.scss';


import angular from 'angular';
import uirouter from 'angular-ui-router';

// Import internal modules
import controller from './error.controller';
import service from './error.service';
import routes from './error.routes';


export default angular.module("error" , [uirouter])
  .config(routes)
  .controller(controller.UID, controller)
  .service(service.UID, service)
  .name;
