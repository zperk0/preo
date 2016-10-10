// Import Style
import './collectionSlotsList.scss';


import angular from 'angular';

// Import internal modules
import controller from './collectionSlotsList.controller';
import directive from './collectionSlotsList.directive';



export default angular.module("collectionSlotsList" , [])


  .controller(controller.UID, controller)
  .directive("collectionSlotsList", directive)
  .name;
