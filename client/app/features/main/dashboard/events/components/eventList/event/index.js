// Import Style
import './event.scss';


import angular from 'angular';

// Import internal modules
import controller from './event.controller';
import directive from './event.directive';



export default angular.module("event" , [])


  .controller(controller.UID, controller)
  .directive("event", directive)
  .name;
