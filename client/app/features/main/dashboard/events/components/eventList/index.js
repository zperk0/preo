// Import Style
import './eventList.scss';


import angular from 'angular';

// Import internal modules
import controller from './eventList.controller';
import directive from './eventList.directive';



export default angular.module("eventList" , [])


  .controller(controller.UID, controller)
  .directive("eventList", directive)
  .name;
