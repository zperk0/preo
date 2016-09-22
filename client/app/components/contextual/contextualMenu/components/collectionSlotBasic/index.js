// Import Style
import './collectionSlotBasic.scss';


// Import internal modules
import controller from './collectionSlotBasic.controller';
import directive from './collectionSlotBasic.directive';


export default angular.module("collectionSlotBasic" , [])

  .controller(controller.UID, controller)
  .directive("collectionSlotBasic", directive)
  .name;
