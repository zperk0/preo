// Import Style
import './cardItemChildren.scss';


import angular from 'angular';

// Import internal modules
import controller from './cardItemChildren.controller';
import directive from './cardItemChildren.directive';



export default angular.module("cardItemChildren" , [])


  .controller(controller.UID, controller)
  .directive("cardItemChildren", directive)
  .name;
