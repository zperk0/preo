// Import Style
import './menuItem.scss';


import angular from 'angular';

// Import internal modules
import controller from './menuItem.controller';
import directive from './menuItem.directive';



export default angular.module("menuItem" , [])


  .controller(controller.UID, controller)
  .directive("menuItem", directive)
  .name;
