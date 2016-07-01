// Import Style
import './menuItemSize.scss';


import angular from 'angular';

// Import internal modules
import controller from './menuItemSize.controller';
import directive from './menuItemSize.directive';


export default angular.module("menuItemSize" , [])

  .controller(controller.UID, controller)
  .directive("menuItemSize", directive)
  .name;
