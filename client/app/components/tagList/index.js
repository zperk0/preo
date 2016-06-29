// Import Style
import './tagList.scss';


import angular from 'angular';

// Import internal modules
import controller from './tagList.controller';
import directive from './tagList.directive';



export default angular.module("tagList" , [])


  .controller(controller.UID, controller)
  .directive("tagList", directive)
  .name;
