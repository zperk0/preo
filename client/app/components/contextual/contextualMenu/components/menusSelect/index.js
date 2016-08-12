// Import Style
import './menusSelect.scss';


import angular from 'angular';

// Import internal modules
import controller from './menusSelect.controller';
import directive from './menusSelect.directive';



export default angular.module("menusSelect" , [])


  .controller(controller.UID, controller)
  .directive("menusSelect", directive)
  .name;
