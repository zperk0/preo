// Import Style
import './redirect.scss';


import angular from 'angular';
import uirouter from 'angular-ui-router';

// Import internal modules
import controller from './redirect.controller';
import routes from './redirect.routes';

export default angular.module("redirect" , [uirouter])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
