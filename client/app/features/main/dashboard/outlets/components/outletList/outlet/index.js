// Import Style
import './outlet.scss';


import angular from 'angular';

// Import internal modules
import controller from './outlet.controller';
import directive from './outlet.directive';



export default angular.module("outlet" , [])


  .controller(controller.UID, controller)
  .directive("outlet", directive)
  .name;
