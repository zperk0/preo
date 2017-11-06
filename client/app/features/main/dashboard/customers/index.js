// Import Style
import './customers.scss';


import angular from 'angular';

// Import internal modules
import controller from './customers.controller';
import routes from './customers.routes';


export default angular.module("webapp.customers" , ['ui.router'])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
