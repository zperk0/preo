// Import Style

import './contextualDrawer.scss';
import angular from 'angular';

// Import internal modules
import service from './contextualDrawer.service';

import controller from './items/contextualDrawer.items.controller';
import directive from './items/contextualDrawer.items.directive';

import modController from './modifiers/contextualDrawer.modifiers.controller';
import modDirective from './modifiers/contextualDrawer.modifiers.directive';

import outletsController from './outlets/contextualDrawer.outlets.controller';
import outletsDirective from './outlets/contextualDrawer.outlets.directive';

import cardItemList from '../../cardItemList';

import base from '../../../app.base';



export default angular.module("contextualDrawer" , [cardItemList, base])
  .service(service.UID, service)

  .controller(controller.UID, controller)
  .directive("contextualDrawerItem", directive)

  .controller(modController.UID, modController)
  .directive("contextualDrawerModifier", modDirective)

  .controller(outletsController.UID, outletsController)
  .directive("contextualDrawerOutlets", outletsDirective)
  .name;
