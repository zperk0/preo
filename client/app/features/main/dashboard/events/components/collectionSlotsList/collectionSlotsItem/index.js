// Import Style
import './collectionSlotsItem.scss';


import angular from 'angular';

// Import internal modules
import controller from './collectionSlotsItem.controller';
import directive from './collectionSlotsItem.directive';



export default angular.module("collectionSlotsItem" , [])


  .controller(controller.UID, controller)
  .directive("collectionSlotsItem", directive)
  .name;
