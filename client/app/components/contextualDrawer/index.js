// Import Style

import './contextualDrawer.scss';
import angular from 'angular';

// Import internal modules
import controller from './items/contextualDrawer.items.controller';
import directive from './items/contextualDrawer.items.directive';
import service from './contextualDrawer.service';



export default angular.module("contextualDrawer" , [])

  .controller(controller.UID, controller)
  .service(service.UID, service)
  .directive("contextualDrawerItem", directive)
  .name;
