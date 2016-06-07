// Import Style
import './appMode.scss';


import angular from 'angular';
import uirouter from 'angular-ui-router';

// Import internal modules
import controller from './appMode.controller';
import routes from './appMode.routes';

export default angular.module("appMode" , [uirouter])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
