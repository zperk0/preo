// Import Style
import './menuItemList.scss';


import angular from 'angular';

// Import internal modules
import controller from './menuItemList.controller';
import directive from './menuItemList.directive';

import menuItem from './menuItem'

export default angular.module("menuItemList" , [menuItem])


  .controller(controller.UID, controller)
  .directive("menuItemList", directive)
  .name;
