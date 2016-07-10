// Import Style
import './modifierSelection.scss';


import angular from 'angular';

// Import internal modules
import controller from './modifierSelection.controller';
import directive from './modifierSelection.directive';



export default angular.module("modifierSelection" , [])


  .controller(controller.UID, controller)
  .directive("modifierSelection", directive)
  .name;
