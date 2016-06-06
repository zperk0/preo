// Import Style
import './weborders.scss';

import angular from 'angular';
import uirouter from 'angular-ui-router';

// Import internal modules
import controller from './weborders.controller';
import routes from './weborders.routes';

export default angular.module("weborders" , [uirouter])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
