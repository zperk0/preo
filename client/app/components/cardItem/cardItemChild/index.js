// Import Style
import './cardItemChild.scss';


import angular from 'angular';

// Import internal modules
import controller from './cardItemChild.controller';
import directive from './cardItemChild.directive';



export default angular.module("cardItemChild" , [])


  .controller(controller.UID, controller)
  .directive("cardItemChild", directive)
  .name;
