// Import Style
import './modifierChip.scss';


import angular from 'angular';

// Import internal modules
import controller from './modifierChip.controller';
import directive from './modifierChip.directive';



export default angular.module("modifierChip" , [])


  .controller(controller.UID, controller)
  .directive("modifierChip", directive)
  .name;
