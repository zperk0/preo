// Import Style
import './signin.scss';


import angular from 'angular';
import uirouter from 'angular-ui-router';

// Import internal modules
import controller from './signin.controller';
import routes from './signin.routes';

export default angular.module("signin" , [uirouter])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
