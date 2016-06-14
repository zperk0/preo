// Import Style
import './notFound.scss';


import angular from 'angular';
import uirouter from 'angular-ui-router';

// Import internal modules
import controller from './notFound.controller';
import routes from './notFound.routes';

export default angular.module("notFound" , [uirouter])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
