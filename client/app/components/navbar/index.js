// Import Style
import './navbar.scss';


import angular from 'angular';

// Import internal modules
import controller from './navbar.controller';
import directive from './navbar.directive';



export default angular.module("navbar" , [])


  .controller(controller.UID, controller)
  .directive("navbar", directive)
  .name;
