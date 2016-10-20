// Import Style
import './taxGroup.scss';


import angular from 'angular';

// Import internal modules
import controller from './taxGroup.controller';
import directive from './taxGroup.directive';



export default angular.module("taxGroup" , [])


  .controller(controller.UID, controller)
  .directive("taxGroup", directive)
  .name;
