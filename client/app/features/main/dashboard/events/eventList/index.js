// Import Style
import './eventList.scss';


import angular from 'angular';
import uirouter from 'angular-ui-router';

// Import internal modules
import controller from './eventList.controller';
import routes from './eventList.routes';


export default angular.module("eventListView" , [uirouter])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
