// Import Style
import './promotions.scss';


import angular from 'angular';
import uirouter from 'angular-ui-router';

// Import internal modules
import controller from './promotions.controller';
import routes from './promotions.routes';

export default angular.module("promotions" , [uirouter])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
