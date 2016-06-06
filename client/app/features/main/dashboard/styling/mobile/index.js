// Import Style
import './mobile.scss';


import angular from 'angular';
import uirouter from 'angular-ui-router';

// Import internal modules
import controller from './mobile.controller';
import routes from './mobile.routes';


export default angular.module("mobile" , [uirouter])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
