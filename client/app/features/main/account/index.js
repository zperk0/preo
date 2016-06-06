// Import Style
import './account.scss';


import angular from 'angular';
import uirouter from 'angular-ui-router';

// Import internal modules
import controller from './account.controller';
import routes from './account.routes';

export default angular.module("account" , [uirouter])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
