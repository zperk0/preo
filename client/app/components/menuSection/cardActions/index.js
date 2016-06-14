// Import Style
import './cardActions.scss';


import angular from 'angular';

// Import internal modules
import controller from './cardActions.controller';
import directive from './cardActions.directive';



export default angular.module("cardActions" , [])


  .controller(controller.UID, controller)
  .directive("cardActions", directive)
  .name;
