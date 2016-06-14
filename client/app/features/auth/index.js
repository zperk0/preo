// Import Style
import './auth.scss';


import angular from 'angular';
import uirouter from 'angular-ui-router';

// Import internal modules
import controller from './auth.controller';
import routes from './auth.routes';
import v2Signin from './signin';


export default angular.module("auth" , [uirouter, v2Signin])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
