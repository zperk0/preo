// Import Style

import angular from 'angular';

// Import internal modules
import controller from './contextualDrawer.controller';
import service from './contextualDrawer.service';



export default angular.module("contextualDrawer" , [])

  .controller(controller.UID, controller)
  .service(service.UID, service)
  .name;
