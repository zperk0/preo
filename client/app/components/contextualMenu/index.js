// Import Style
import './contextualMenu.scss';


import angular from 'angular';

// Import internal modules
import controller from './contextualMenu.controller';
import service from './contextualMenu.service';
import directive from './contextualMenu.directive';
import holderDirective from './contextualMenuHolder.directive';

import menuItemSize from './components/menuItemSize';


export default angular.module("contextualMenu" , [menuItemSize])


  .controller(controller.UID, controller)
  .service(service.UID, service)
  .directive("contextualMenu", directive)
  .directive("contextualMenuHolder", holderDirective)
  .name;
