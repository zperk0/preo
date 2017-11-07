// Import Style
import './customers.scss';


import angular from 'angular';
import searchPanel from 'app/components/searchPanel';

// Import internal modules
import controller from './customers.controller';
import routes from './customers.routes';


export default angular.module("webapp.customers" , ['ui.router', searchPanel])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
