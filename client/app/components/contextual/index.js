// Import Style

import angular from 'angular';

// Import internal modules
import contextualMenu from './contextualMenu';
import contextualDrawer from './contextualDrawer';
import service from './contextual.service'

export default angular.module("contextual" , [contextualMenu, contextualDrawer])
  .service(service.UID,service)
  .name;
