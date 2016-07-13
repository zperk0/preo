// Import Style
import './modifierItem.scss';


import angular from 'angular';

// Import internal modules
import controller from './modifierItem.controller';
import directive from './modifierItem.directive';



export default angular.module("modifierItem" , [])


  .controller(controller.UID, controller)
  .directive("modifierItem", directive)
  .name;
