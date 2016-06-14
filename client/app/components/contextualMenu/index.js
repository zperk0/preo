// Import Style
import './contextualMenu.scss';


import angular from 'angular';

// Import internal modules
import controller from './contextualMenu.controller';
import directive from './contextualMenu.directive';



export default angular.module("contextualMenu" , [])


  .controller(controller.UID, controller)
  .directive("contextualMenu", directive)
  .name;
